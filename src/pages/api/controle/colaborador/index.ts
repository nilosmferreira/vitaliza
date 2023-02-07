import { Endereco } from '@/application/entities/endereco';
import { Pessoa } from '@/application/entities/pessoa';
import { RequestQuerySchema } from '@/helpers/request-query-schema';
import { PrismaColaboradoresRepository } from '@/infra/database/prisma/repositories/prisma-colaboradores-repository';
import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const repository = new PrismaColaboradoresRepository();

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { limit, offset } = RequestQuerySchema.parse(req.query);

    const colaboradores = await repository.find();

    return res.status(200).json({ colaboradores, count: 0 });
  } else if (method === 'POST') {
    const colaboradorSchema = z.object({
      nome: z.string(),
      razao: z.string(),
      cep: z.string(),
      numero: z.string().nullish(),
      complemento: z.string().nullish(),
      telefone: z
        .string()
        .nullable()
        .transform((value) => (value ? value?.replace(/\D/g, '') : null)),
      celular: z
        .string()
        .nullable()
        .transform((value) => (value ? value?.replace(/\D/g, '') : null)),
      telefone_comercial: z
        .string()
        .nullable()
        .transform((value) => (value ? value?.replace(/\D/g, '') : null)),
      logradouro: z.string(),
      cidade: z.string(),
      uf: z.string(),
      bairro: z.string(),
      cargos: z.string().transform((value) => value.split(',')),
      image: z.string().nullish().nullable(),
    });
    try {
      const incomingForm = new IncomingForm();

      incomingForm.parse(req, async (error, fields, files) => {
        if (error) {
          return res.status(400).end();
        }
        const {
          celular,
          bairro,
          cargos,
          cep,
          cidade,
          complemento,
          logradouro,
          nome,
          numero,
          razao,
          telefone,
          telefone_comercial,
          uf,
          image: imageData,
        } = colaboradorSchema.parse(JSON.parse(String(fields['data'])));
        if (imageData) {
          // if (files['avatar']) {
          //   const file = files['avatar'] as formidable.File;
          //   const result = await sendingS3Amazon(file);
          //   data.image = result.fileName;
          // }
        }
        const enderecoEntity = new Endereco({
          complemento,
          bairro,
          numero,
          cep,
          cidade,
          estado: uf,
          logradouro,
        });
        const pessoa = new Pessoa({
          apelido: razao,
          celular,
          email: null,
          endereco: [enderecoEntity],
          nome,
          razao,
          telefone,
          telefone_comercial,
          tipoPessoa: 'colaborador',
        });

        return res.status(201).json(pessoa);
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finalizou');
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handle;
