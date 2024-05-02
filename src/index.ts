import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/business", async (req, res) => {
  const business = await prisma.business.findMany();
  res.json(business);
});

app.get("/reviews", async (req, res) => {
  const reviews = await prisma.review.findMany({});
  res.json(reviews);
});

app.get(`/reviews/:id`, async (req, res) => {
  const { id } = req.params;
  const reviews = await prisma.review.findUnique({
    where: { id: String(id) },
  });
  res.json(reviews);
});

////////////////////////////////////////////////////////////////////////

app.post(`/createBusiness`, async (req, res) => {
  const { name, linkMap, linkReview, createdAt, updatedAt } = req.body;

  const newBusiness = await prisma.business.create({
    data: {
      name,
      linkMap,
      linkReview,
      createdAt,
      updatedAt,
    },
  });
  res.json(newBusiness);
});

app.post(`/createReview`, async (req, res) => {
  const { rating, approximateDate, text, createdAt, updatedAt } = req.body;
  const newReview = await prisma.review.create({
    data: {
      rating,
      approximateDate,
      text,
      createdAt,
      updatedAt,
    },
  });
  res.json(newReview);
});

/////////////////////////////////////////////////////////////////////

app.put(`/updateBusiness/:id`, async (req, res) => {
  const { id } = req.params;
  const { name, linkMap, linkReview, createdAt, updatedAt } = req.body;

  try {
    const existingBusiness = await prisma.business.findUnique({
      where: { id },
    });

    if (!existingBusiness) {
      return res.status(404).json({ error: "Empresa não Existe" });
    }

    const updatedBusiness = await prisma.business.update({
      where: { id },
      data: {
        name,
        linkMap,
        linkReview,
        createdAt,
        updatedAt,
      },
    });

    res.json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
