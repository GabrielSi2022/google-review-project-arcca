import { Request, Response } from "express";
import { ReviewsRepositoryPrisma } from "../../../../repositories/reviews/prisma/reviews.repository.prisma";
import { ReviewsServiceImplementation } from "../../../../services/reviews/implementation/reviews.service.implementation";
import { prisma } from "../../../../util/prisma.util";

export class ReviewsController {
  private constructor() {}

  public static build() {
    return new ReviewsController();
  }

  public async create(req: Request, res: Response) {
    const { classification, date, text, answer, createdAt, updatedAt } =
      req.body;

    const repository = ReviewsRepositoryPrisma.build(prisma);
    const service = ReviewsServiceImplementation.build(repository);

    const output = await service.create(
      classification,
      date,
      text,
      answer,
      createdAt,
      updatedAt
    );

    const responseData = {
      classification,
      date,
      text,
      answer,
      createdAt,
      updatedAt,
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
