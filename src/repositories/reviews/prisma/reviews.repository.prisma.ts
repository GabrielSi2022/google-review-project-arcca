import { PrismaClient } from "@prisma/client";
import { Reviews } from "../../../entities/reviews";
import { ReviewsRepository } from "../reviews.repository";

export class ReviewsRepositoryPrisma implements ReviewsRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  static build(prisma: PrismaClient): ReviewsRepositoryPrisma {
    return new ReviewsRepositoryPrisma(prisma);
  }

  async save(reviews: Reviews): Promise<void> {
    try {
      const {
        classification,
        date,
        text,
        answer,
        createdAt,
        updatedAt,
        userId: userReviewsId,
        reviewsId,
      } = reviews;

      await this.prisma.review.upsert({
        where: { id: reviewsId },

        create: {
          classification,
          date,
          text,
          answer,
          createdAt,
          updatedAt,
          userReviews: { connect: { id: userReviewsId } },
          id: reviewsId,
        },

        update: {
          classification,
          date,
          text,
          answer,
          createdAt,
          updatedAt,
        },
      });
    } catch (error: any) {
      throw new Error(`Failed to save review: ${error.message}`);
    }
  }

  async list(): Promise<Reviews[]> {
    try {
      const reviewsFromDB = await this.prisma.review.findMany();
      return reviewsFromDB.map(
        ({
          classification,
          date,
          text,
          answer,
          createdAt,
          updatedAt,
          userReviewsId: userId,
        }) =>
          Reviews.with(
            classification,
            date,
            text,
            answer,
            createdAt,
            updatedAt,
            userId
          )
      );
    } catch (error: any) {
      throw new Error(`Failed to list reviews: ${error.message}`);
    }
  }
}
