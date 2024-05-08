import { Request, Response } from "express";
import { UserReviewsRepositoryPrisma } from "../../../../repositories/userReviews/prisma/userReviews.repository.prisma";
import { UserReviewsServiceImplementation } from "../../../../services/userReviews/implementation/userReviews.service.implamentation";
import { prisma } from "../../../../util/prisma.util";

export class UserReviewsController {
  private constructor() {}

  public static build() {
    return new UserReviewsController();
  }

  public async create(req: Request, res: Response) {
    const { id, name, imgUrl } = req.body;

    const repository = UserReviewsRepositoryPrisma.build(prisma);
    const service = UserReviewsServiceImplementation.build(repository);

    const { userReviews } = await service.create(id, name, imgUrl);

    res.status(201).json({...userReviews});
  }

  public async list(req: Request, res: Response) {
    const repository = UserReviewsRepositoryPrisma.build(prisma);
    const service = UserReviewsServiceImplementation.build(repository);

    const { userReviews } = await service.list();

    res.status(200).json({ userReviews });
  }
}
