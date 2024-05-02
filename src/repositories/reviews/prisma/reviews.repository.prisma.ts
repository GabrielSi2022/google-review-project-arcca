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
      rating: reviews.rating,
      approximatedDate: reviews.approximatedDate,
      text: reviews.text,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
    };

    await this.prisma.review.create({ data });
  }

  public async list(): Promise<Reviews[]> {
    const aReviews = await this.prisma.review.findMany();

    const reviews: Reviews[] = aReviews.map((r) => {
      const { rating, approximatedDate, text, createdAt, updatedAt } = r;
      return Reviews.with(rating, approximatedDate, text, createdAt, updatedAt);
    });

    return reviews;
  }
}
