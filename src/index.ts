import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newReview = await prisma.review.create({
    data: {
      rating: 4.5,
      approximateDate: "02/05/2024",
      text: "Excelente serviço",
      createdAt: new Date(),
      updatedAt: new Date(),
      published: false,
    },
  });
  console.log("Created new review: ", newReview);

  const newBusiness = await prisma.business.create({
    data: {
      name: "Pérola negra Moda Intima",
      linkMap: "https://github.com/",
      linkReview: "https://google.com/",
      createdAt: new Date(),
      updatedAt: new Date(),
      reviews: {
        connect: {
          id: newReview.id,
        },
      },
    },
  });
  console.log("Created new business: ", newBusiness);

  const allBusiness = await prisma.business.findMany({
    include: { reviews: true },
  });
  console.log("All business: ");
  console.dir(allBusiness, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
