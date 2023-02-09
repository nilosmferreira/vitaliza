import { Colaborador } from '@/application/entities/colaborador';
import { sendingS3Amazon } from '@/application/shared/sending-s3-amazon';
import { RequestQuerySchema } from '@/helpers/request-query-schema';
import prisma from '@/infra/database/prisma';
import { PrismaColaboradoresRepository } from '@/infra/database/prisma/repositories/prisma-colaboradores-repository';
import { ColaboradorViewModel } from '@/infra/http/colaborador-view-model';
import formidable, { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const repository = new PrismaColaboradoresRepository();

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { limit, offset } = RequestQuerySchema.parse(req.query);

    const colaboradores = await repository.find();
    const result = colaboradores.data.map((item) =>
      ColaboradorViewModel.toHTTP(item)
    );
    return res.status(200).json({ data: result, count: colaboradores.count });
  } else if (method === 'POST') {
    const colaboradorSchema = z.object({
      nome: z.string(),
      razao: z.string(),
      cep: z.string().nullable(),
      numero: z.string().nullable(),
      complemento: z.string().nullable(),
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
      logradouro: z.string().nullable(),
      cidade: z.string().nullable(),
      uf: z.string().nullable(),
      bairro: z.string().nullable(),
      cargos: z.string().transform((value) => value.split(',')),
      image: z.string().nullish().nullable(),
    });
    try {
      const incomingForm = new IncomingForm({
        multiples: false,
      });

      incomingForm.parse(
        req,
        async (error, fields, files: formidable.Files) => {
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
          let fileName: string = '';
          if (imageData) {
            if (files['avatar']) {
              const myfiles = files['avatar'] as formidable.File[];

              const result = await sendingS3Amazon(myfiles[0]);
              fileName = result.fileName;
              // return res.status(400).end();
            }
          }
          const colaborador = new Colaborador({
            apelido: razao,
            avatar: fileName.length > 0 ? fileName : null,
            bairro,
            celular,
            cep,
            cidade,
            email: null,
            endereco_complemento: complemento,
            logradouro,
            nome,
            numero,
            razao_social: razao,
            telefone,
            telefone_comercial,
            cargos,
            uf,
          });
          await repository.create(colaborador);
          const occupations = await prisma.occupation.findMany({
            where: {
              name: {
                in: cargos,
              },
            },
          });
          await prisma.occupationsCollaborator.createMany({
            data: occupations.map((occupation) => ({
              collaboratorId: colaborador.id,
              occupationId: occupation.id,
            })),
          });
          // await prisma.occupationsCollaborator.deleteMany({
          //   where: {
          //     collaboratorId: colaborador.id,
          //   },
          // });
          return res.status(201).json(colaborador);
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finalizou');
    }
  } else if (method === 'PUT') {
    const colaboradorSchema = z.object({
      id: z.string().uuid(),
      nome: z.string(),
      razao: z.string(),
      cep: z.string().nullable(),
      numero: z.string().nullable(),
      complemento: z.string().nullable(),
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
      logradouro: z.string().nullable(),
      cidade: z.string().nullable(),
      uf: z.string().nullable(),
      bairro: z.string().nullable(),
      cargos: z.string().transform((value) => value.split(',')),
      image: z.string().nullish().nullable(),
    });
    try {
      const incomingForm = new IncomingForm({
        multiples: false,
      });

      incomingForm.parse(
        req,
        async (error, fields, files: formidable.Files) => {
          if (error) {
            return res.status(400).end();
          }
          const {
            id,
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
          let fileName: string = '';

          if (imageData) {
            if (files['avatar']) {
              const myfiles = files['avatar'] as formidable.File[];

              const result = await sendingS3Amazon(myfiles[0]);
              fileName = result.fileName;
            }
          }
          const colaborador = new Colaborador(
            {
              apelido: razao,
              avatar: fileName.length > 0 ? fileName : null,
              bairro,
              celular,
              cep,
              cidade,
              email: null,
              endereco_complemento: complemento,
              logradouro,
              nome,
              numero,
              razao_social: razao,
              telefone,
              telefone_comercial,
              uf,
              cargos,
            },
            id
          );
          await repository.save(colaborador, id);
          const occupations = await prisma.occupation.findMany({
            where: {
              name: {
                in: cargos,
              },
            },
          });
          await prisma.occupationsCollaborator.deleteMany({
            where: {
              collaboratorId: id,
            },
          });
          await prisma.occupationsCollaborator.createMany({
            data: occupations.map((occupation) => ({
              collaboratorId: colaborador.id,
              occupationId: occupation.id,
            })),
          });

          return res.status(201).json(colaborador);
        }
      );
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
