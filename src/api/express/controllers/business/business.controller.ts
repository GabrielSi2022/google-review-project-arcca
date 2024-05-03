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
    const { nameBusiness, addressMap, addressReview, createdAt, updatedAt } =
      req.body;

    const aRepository = BusinessRepositoryPrisma.build(prisma);
    const aService = BusinessServiceImplementation.build(aRepository);

    const output = await aService.create(
      nameBusiness,
      addressMap,
      addressReview,
      createdAt,
      updatedAt
    );

    const data = {
      nameBusiness: nameBusiness,
      addressMap: addressMap,
      addressReview: addressReview,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    res.status(201).json(data);
  }

  public async list(req: Request, res: Response) {
    const aRepository = BusinessRepositoryPrisma.build(prisma);
    const aService = BusinessServiceImplementation.build(aRepository);

    const output = await aService.list();

    const data = {
      business: output.business,
    };

    res.status(200).json(data);
  }
}
