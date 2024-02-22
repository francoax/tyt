import { hashPassword } from "../src/lib/utils";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: "tyt" },
    update: {},
    create: {
      username: "tyt",
      password: await hashPassword("tyt123"),
    },
  });
  console.log("User created...");

  await prisma.category.createMany({
    data: [
      {
        description: "Fibra optica",
      },
      {
        description: "Accesorios de rack",
      },
      {
        description: "UTP",
      },
      {
        description: "Materiales electricos",
      },
      {
        description: "Canalizacion",
      },
    ],
    skipDuplicates: false,
  });
  console.log("Categories created...");

  await prisma.unit.createMany({
    data: [
      {
        description: "Metros",
      },
      {
        description: "Cajas",
      },
    ],
    skipDuplicates: false,
  });
  console.log("Units created...");

  await prisma.product.createMany({
    data: [
      {
        name: "CAT 5e",
        unitId: 2,
        categoryId: 3,
      },
      {
        name: "Fibra monomodo",
        unitId: 1,
        categoryId: 1,
      },
    ],
    skipDuplicates: false,
  });
  console.log("Products created...");

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
