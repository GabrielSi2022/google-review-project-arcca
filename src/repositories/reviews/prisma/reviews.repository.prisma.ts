import { PrismaClient } from "@prisma/client";
import { Reviews } from "../../../entities/reviews";
import { ReviewsRepository } from "../reviews.repository";

export class ReviewsRepositoryPrisma implements ReviewsRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new ReviewsRepositoryPrisma(prisma);
  }

  public async save(reviews: Reviews): Promise<void> {
    const data = {
      classification: reviews.classification,
      date: reviews.date,
      text: reviews.text,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
    };

    await this.prisma.review.create({ data });
  }

  public async list(): Promise<Reviews[]> {
    const aReviews = await this.prisma.review.findMany();

    const reviews: Reviews[] = aReviews.map((r) => {
      const { classification, date, text, createdAt, updatedAt } = r;
      return Reviews.with(classification, date, text, createdAt, updatedAt);
    });

    return reviews;
  }
}
