import { PrismaClient } from "@prisma/client";
import { UserReviews } from "../../../entities/userReviews";
import { UserReviewsRepository } from "../userReviews.repository";

export class UserReviewsRepositoryPrisma implements UserReviewsRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserReviewsRepositoryPrisma(prisma);
  }

  public async save(userReviews: UserReviews): Promise<void> {
    const data = {
      id: userReviews.id,
      name: userReviews.name,
      imgUrl: userReviews.imgUrl,
    };

    await this.prisma.userReviews.create({ data });
  }

  public async list(): Promise<UserReviews[]> {
    const aUserReviews = await this.prisma.userReviews.findMany();

    const userReviews: UserReviews[] = aUserReviews.map((u) => {
      const { id, name, imgUrl } = u;
      return UserReviews.with(id, name, imgUrl);
    });

    return userReviews;
  }
}
