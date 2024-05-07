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
      date,
      text,
      answer,
      createdAt,
      updatedAt,
      userId,
      userName,
      imgUrl,
      reviewsId,
    } = req.body;

    const repository = ReviewsRepositoryPrisma.build(prisma);
    const service = ReviewsServiceImplementation.build(repository);
    const userRepository = UserReviewsRepositoryPrisma.build(prisma);
    const userService = UserReviewsServiceImplementation.build(userRepository);

    const userOutput = await userService.create(userId, userName, "");

    const output = await service.create(
      classification,
      date,
      text,
      answer,
      createdAt,
      updatedAt,
      userId,
      reviewsId
    );

    const responseData = {
      classification,
      date,
      text,
      answer,
      createdAt,
      updatedAt,
      reviewsId,
    };
    res.status(201).json(responseData);
  }

  public async list(req: Request, res: Response) {
    const repository = ReviewsRepositoryPrisma.build(prisma);
    const service = ReviewsServiceImplementation.build(repository);

    const output = await service.list();

    const responseData = { reviews: output.reviews };
    res.status(200).json(responseData);
  }
}
