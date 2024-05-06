import { PrismaClient } from "@prisma/client";
import { UserReviews } from "../../../entities/userReviews";
import { UserReviewsRepository } from "../userReviews.repository";

export class UserReviewsRepositoryPrisma implements UserReviewsRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  static build(prisma: PrismaClient): UserReviewsRepositoryPrisma {
    return new UserReviewsRepositoryPrisma(prisma);
  }

  async save(userReviews: UserReviews): Promise<void> {
    try {
      const { id, name, imgUrl } = userReviews;
      await this.prisma.userReviews.create({
        data: { id, name, imgUrl },
      });
    } catch (error: any) {
      throw new Error(`Falha ao salvar userReview: ${error.message}`);
    }
  }

  async list(): Promise<UserReviews[]> {
    try {
      const userReviewsFromDB = await this.prisma.userReviews.findMany();
      return userReviewsFromDB.map(({ id, name, imgUrl }) =>
        UserReviews.with(id, name, imgUrl)
      );
    } catch (error: any) {
      throw new Error(`Falha ao listar userReviews: ${error.message}`);
    }
  }
}
