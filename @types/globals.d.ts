import { PrismaClient } from '@prisma/client';

declare global {
  type prisma = PrismaClient;
}
