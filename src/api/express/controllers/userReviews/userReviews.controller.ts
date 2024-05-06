import { UserReviewsRepositoryPrisma } from "../../../../repositories/userReviews/prisma/userReviews.repository.prisma";
import { UserReviewsServiceImplementation } from "../../../../services/userReviews/implementation/userReviews.service.implamentation";
import { prisma } from "../../../../util/prisma.util";
import { Request, Response } from "express";

export class UserReviewsController {
  private constructor() {}

  public static build() {
    return new UserReviewsController();
  }

  public async create(req: Request, res: Response) {
    const { id, name, imgUrl } = req.body;

    const aRepository = UserReviewsRepositoryPrisma.build(prisma);
    const aService = UserReviewsServiceImplementation.build(aRepository);

    const output = await aService.create(id, name, imgUrl);

    const data = {
      id: id,
      name: name,
      imgUrl: imgUrl,
    };

    res.status(201).json(data);
  }

  public async list(req: Request, res: Response) {
    const aRepository = UserReviewsRepositoryPrisma.build(prisma);
    const aService = UserReviewsServiceImplementation.build(aRepository);

    const output = await aService.list();

    const data = {
      userReviews: output.userReviews,
    };

    res.status(200).json(data);
  }
}
