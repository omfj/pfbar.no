import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Product 1",
        description: "Product 1 description",
      },
      {
        name: "Product 2",
        description: "Product 2 description",
      },
      {
        name: "Product 3",
        description: "Product 3 description",
      },
      {
        name: "Product 4",
        description: "Product 4 description",
      },
    ],
  });

  console.log("Added products:", products);
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
