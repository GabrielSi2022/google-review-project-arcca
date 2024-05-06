import { Request, Response } from "express";
import { BusinessRepositoryPrisma } from "../../../../repositories/business/prisma/business.repository.prisma";
import { BusinessServiceImplementation } from "../../../../services/business/implementation/business.service.implementation";
import { prisma } from "../../../../util/prisma.util";

export class BusinessController {
  private constructor() {}

  public static build() {
    return new BusinessController();
  }

  public async create(req: Request, res: Response) {
    const { nameBusiness, addressMap, addressReview, createdAt, updatedAt } =
      req.body;

    const repository = BusinessRepositoryPrisma.build(prisma);
    const service = BusinessServiceImplementation.build(repository);

    const output = await service.create(
      nameBusiness,
      addressMap,
      addressReview,
      createdAt,
      updatedAt
    );

    const data = {
      nameBusiness,
      addressMap,
      addressReview,
      createdAt,
      updatedAt,
    };
    res.status(201).json(data);
  }

  public async list(req: Request, res: Response) {
    const repository = BusinessRepositoryPrisma.build(prisma);
    const service = BusinessServiceImplementation.build(repository);

    const output = await service.list();
    const data = { business: output.business };

    res.status(200).json(data);
  }
}
