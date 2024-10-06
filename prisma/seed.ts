import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Pricing Plan if not exist
  await prisma.pricingPlan.upsert({
    where: { id: 'cm1nkxpy300000cmf01krhpzs' },
    update: {},
    create: {
      id: 'cm1nkxpy300000cmf01krhpzs',
      name: 'Paket A SIMODANG',
      description:
        'Akses gratis untuk 1 kolam selama 3 bulan, ideal bagi pemula.',
      price: 0,
      pondLimit: 1,
      duration: 90,
    },
  });
  await prisma.pricingPlan.upsert({
    where: { id: 'cm1njxdb300010cl8fw5d7cnu' },
    update: {},
    create: {
      id: 'cm1njxdb300010cl8fw5d7cnu',
      name: 'Paket B SIMODANG',
      description:
        'Kelola hingga 10 kolam selama 1 tahun, cocok untuk skala menengah.',
      price: 1500000,
      pondLimit: 10,
      duration: 365,
    },
  });
  await prisma.pricingPlan.upsert({
    where: { id: 'cm1nk26k700020cl82j765i7f' },
    update: {},
    create: {
      id: 'cm1nk26k700020cl82j765i7f',
      name: 'Paket C SIMODANG',
      description:
        'Kelola hingga 1000 kolam selama 1 tahun, pilihan terbaik untuk skala besar.',
      price: 2000000,
      pondLimit: 1000,
      duration: 365,
    },
  });
}

main()
  .then(async () => {
    console.log('Seed success');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
