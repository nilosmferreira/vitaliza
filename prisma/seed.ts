import { hashSync } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient({
  log: ['error'],
});

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'nilo_ferreira@hotmail.com',
    },
    update: {},
    create: {
      id: randomUUID(),
      firstName: 'Nilo',
      lastName: 'Ferreira',
      userName: 'niloferreira',
      password: hashSync('G!o301096@', 13),
      email: 'nilo_ferreira@hotmail.com',
      createdAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
