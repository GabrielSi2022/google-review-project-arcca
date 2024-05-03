import { BusinessRepositoryPrisma } from "../../../../repositories/business/prisma/business.repository.prisma";
import { BusinessServiceImplementation } from "../../../../services/business/implementation/business.service.implementation";
import { prisma } from "../../../../util/prisma.util";
import { Request, Response } from "express";

export class BusinessController {
  private constructor() {}

  public static build() {
    return new BusinessController();
  }

  public async create(req: Request, res: Response) {
    const { name, linkMap, linkReview, createdAt, updatedAt } = req.body;

    const aRepository = BusinessRepositoryPrisma.build(prisma);
    const aService = BusinessServiceImplementation.build(aRepository);

    const output = await aService.create(
      name,
      linkMap,
      linkReview,
      createdAt,
      updatedAt
    );

    const data = {
      name: name,
      linkMap: linkMap,
      linkReview: linkReview,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    res.status(201).json(data).send();
  }

  public async list(req: Request, res: Response) {
    const aRepository = BusinessRepositoryPrisma.build(prisma);
    const aService = BusinessServiceImplementation.build(aRepository);

    const output = await aService.list();

    const data = {
      business: output.business,
    };

    res.status(200).json(data).send();
  }
}
