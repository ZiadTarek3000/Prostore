import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';
import { hash } from '@/lib/encrypt';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  const users = [];
  for (let i = 0; i < sampleData.users.length; i++) {
    const sampleUser = sampleData.users[i];
    const isAdmin = sampleUser.role === 'admin';

    const name =
      isAdmin && process.env.ADMIN_NAME ? process.env.ADMIN_NAME : sampleUser.name;
    const email =
      isAdmin && process.env.ADMIN_EMAIL
        ? process.env.ADMIN_EMAIL
        : sampleUser.email;
    const plainPassword =
      isAdmin && process.env.ADMIN_PASSWORD
        ? process.env.ADMIN_PASSWORD
        : sampleUser.password;

    users.push({
      ...sampleUser,
      name,
      email,
      password: await hash(plainPassword),
    });
  }
  await prisma.user.createMany({ data: users });

  console.log('Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
