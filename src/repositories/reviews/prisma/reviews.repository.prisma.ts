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
        text,
        answer,
        userId: userReviewsId,
        reviewsId,
        businessId,
      } = reviews;

      await this.prisma.review.upsert({
        where: { id: reviewsId },
        create: {
          classification,
          text,
          answer,
          userReviews: { connect: { id: userReviewsId } },
          id: reviewsId,
          Business: { connect: { id: businessId } },
        },
        update: {
          classification,
          text,
          answer
        }
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
          id,
          classification,
          text,
          answer,
          userReviewsId: userId,
          businessId,
        }) =>
          Reviews.with(
          classification,
          text,
          answer,
          userId!,
          id,
          businessId!,
          )
      );
    } catch (error: any) {
      throw new Error(`Failed to list reviews: ${error.message}`);
    }
  }
}
