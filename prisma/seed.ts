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
  await prisma.user.upsert({
    where: {
      email: 'affinijr@gmail.com',
    },
    update: {
      firstName: 'Antônio',
    },
    create: {
      id: randomUUID(),
      firstName: 'Antônio',
      lastName: 'Affini',
      userName: 'affini',
      password: hashSync('vitaliza02', 13),
      email: 'affinijr@gmail.com',
      createdAt: new Date(),
    },
  });

  await prisma.kindOfPerson.upsert({
    where: {
      name: 'colaborador',
    },
    update: {},
    create: {
      id: randomUUID(),
      name: 'colaborador',
    },
  });
  await prisma.kindOfPerson.upsert({
    where: {
      name: 'atleta',
    },
    update: {},
    create: {
      id: randomUUID(),
      name: 'atleta',
    },
  });
  await prisma.kindOfPerson.upsert({
    where: {
      name: 'responsavel',
    },
    update: {},
    create: {
      id: randomUUID(),
      name: 'responsavel',
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
