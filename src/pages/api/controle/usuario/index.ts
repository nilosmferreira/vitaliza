import { sendingS3Amazon } from '@/application/shared/sending-s3-amazon';
import { RequestQuerySchema } from '@/helpers/request-query-schema';
import prisma from '@/infra/database/prisma';
import { hashSync } from 'bcrypt';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export default async function Usuarios(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    const { limit, offset } = RequestQuerySchema.parse(req.query);
    switch (method) {
      case 'POST':
        const RequestNewUserData = z.object({
          userName: z
            .string({
              required_error: 'Campo é obrigatório',
            })
            .min(3, {
              message: 'Deve ter 3 ou mais caracteres',
            })
            .max(20, {
              message: 'Deve ter menos de 20 caracteres',
            }),
          firstName: z.string({
            required_error: 'Campo é obrigatório',
          }),
          lastName: z.string({
            required_error: 'Campo é obrigatório',
          }),
          email: z
            .string({
              required_error: 'Campo é obrigatório',
            })
            .email({
              message: 'Não é um e-mail válido',
            }),
          password: z.string({
            required_error: 'Campo é obrigatório',
          }),
        });

        const { userName, firstName, lastName, email, password } =
          RequestNewUserData.parse(req.body);

        const userAlreadyExists = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                userName,
              },
            ],
          },
        });
        if (userAlreadyExists) {
          return res
            .status(400)
            .json({ message: 'nome do usuário ou e-mail já existe!' });
        }
        const hashPassword = hashSync(password, 13);
        try {
          await prisma.user.create({
            data: {
              id: randomUUID(),
              userName,
              firstName,
              lastName,
              email,
              password: hashPassword,
            },
          });
          return res.status(201).end();
        } catch (error) {}
      case 'GET':
        const users = await prisma.user.findMany({
          take: limit,
          skip: offset,
          orderBy: {
            firstName: 'desc',
          },
        });
        const count = await prisma.user.count();
        return res.status(200).json({
          data: users.map(
            ({ firstName, lastName, createdAt, deletedAt, email, id }) => {
              return { firstName, lastName, email, createdAt, deletedAt, id };
            }
          ),
          limit,
          offset,
          count,
        });
      case 'PUT':
        const updateUserData = z.object({
          firstName: z.string({
            required_error: 'Campo é obrigatório',
          }),
          lastName: z.string({
            required_error: 'Campo é obrigatório',
          }),
          email: z
            .string({
              required_error: 'Campo é obrigatório',
            })
            .email({
              message: 'Não é um e-mail válido',
            }),
        });

        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
          if (error) {
            return res.status(400).json(error);
          }
          if (fields['data']) {
            const { firstName, lastName, email } = updateUserData.parse(
              JSON.parse(String(fields['data']))
            );
            let avatar: string = '';
            if (files['avatar']) {
              const file = files['avatar'] as formidable.File;
              const result = await sendingS3Amazon(file);
              avatar = result.fileName;
            }

            if (avatar.length > 0) {
              await prisma.user.update({
                where: {
                  email,
                },
                data: {
                  firstName,
                  lastName,
                  avatar,
                },
              });
            } else {
              await prisma.user.update({
                where: {
                  email,
                },
                data: {
                  firstName,
                  lastName,
                },
              });
            }
          }

          return res.status(201).end();
        });
        return res.status(201).end();
    }
  } catch (error) {
    if (error instanceof Error) return res.status(500).send(error.message);
    else return res.status(500).end();
  }
}
