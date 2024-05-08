import { Request, Response } from "express";
import { ReviewsRepositoryPrisma } from "../../../../repositories/reviews/prisma/reviews.repository.prisma";
import { ReviewsServiceImplementation } from "../../../../services/reviews/implementation/reviews.service.implementation";
import { prisma } from "../../../../util/prisma.util";
import { UserReviewsRepositoryPrisma } from "../../../../repositories/userReviews/prisma/userReviews.repository.prisma";
import { UserReviewsServiceImplementation } from "../../../../services/userReviews/implementation/userReviews.service.implamentation";

export class ReviewsController {
  private constructor() {}

  public static build() {
    return new ReviewsController();
  }

  public async create(req: Request, res: Response) {
    const {
      classification,
      text,
      answer,
      userId,
      userName,
      reviewsId,
      businessId,

    } = req.body;

    const repository = ReviewsRepositoryPrisma.build(prisma);
    const service = ReviewsServiceImplementation.build(repository);
    const userRepository = UserReviewsRepositoryPrisma.build(prisma);
    const userService = UserReviewsServiceImplementation.build(userRepository);;

    const { userReviews } = await userService.create(userId, userName, "");

    const { reviews } = await service.create(
      classification,
      text,
      answer,
      userReviews.id,
      reviewsId,
      businessId
    );

    res.status(201).json({ reviews });
  }

  public async list(req: Request, res: Response) {
    const repository = ReviewsRepositoryPrisma.build(prisma);
    const service = ReviewsServiceImplementation.build(repository);

    const { reviews } = await service.list();

    res.status(200).json({ reviews });
  }
}
