import { ReviewsRepositoryPrisma } from "../../../../repositories/reviews/prisma/reviews.repository.prisma";
import { ReviewsServiceImplementation } from "../../../../services/reviews/implemantation/reviews.service.implementation";
import { prisma } from "../../../../util/prisma.util";
import { Request, Response } from "express";

export class ReviewsController {
  private constructor() {}

  public static build() {
    return new ReviewsController();
  }

  public async create(req: Request, res: Response) {
    const { classification, date, text, createdAt, updatedAt } = req.body;

    const aRepository = ReviewsRepositoryPrisma.build(prisma);
    const aService = ReviewsServiceImplementation.build(aRepository);

    const output = await aService.create(
      classification,
      date,
      text,
      createdAt,
      updatedAt
    );

    const data = {
      classification: classification,
      date: date,
      text: text,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    res.status(201).json(data);
  }

  public async list(req: Request, res: Response) {
    const aRepository = ReviewsRepositoryPrisma.build(prisma);
    const aService = ReviewsServiceImplementation.build(aRepository);

    const output = await aService.list();

    const data = {
      reviews: output.reviews,
    };

    res.status(200).json(data);
  }
}
