import { container } from 'tsyringe';
import { PrismaUsuariosRepository } from './database/prisma/repositories/prisma-usuarios-repository';

container.registerSingleton('usersRepository', PrismaUsuariosRepository);
