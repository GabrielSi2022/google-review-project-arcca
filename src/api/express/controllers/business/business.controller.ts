import { Request, Response } from "express";
import { BusinessRepositoryPrisma } from "../../../../repositories/business/prisma/business.repository.prisma";
import { BusinessServiceImplementation } from "../../../../services/business/implementation/business.service.implementation";
import { prisma } from "../../../../util/prisma.util";
import { getReviews } from "../../../../components/getReviews";

export class BusinessController {
  private constructor() {}

  public static build() {
    return new BusinessController();
  }

  public async create(req: Request, res: Response) {
    const { nameBusiness, id, addressMap, addressReview } = req.body;

    const repository = BusinessRepositoryPrisma.build(prisma);
    const service = BusinessServiceImplementation.build(repository);

    const { business } = await service.create(
      nameBusiness,
      id,
      addressMap,
      addressReview
    );

    res.status(201).json({ business });
  }

  public async list(req: Request, res: Response) {
    const repository = BusinessRepositoryPrisma.build(prisma);
    const service = BusinessServiceImplementation.build(repository);

    const { business } = await service.list();

    res.status(200).json({ business });
  }

  public async update(req: Request, res: Response) {
    try {
      const { total } = await getReviews();

      res.status(201).json({ message: "Reviews atualizadas", total });
    } catch (err) {
      throw new Error("Erro ao atualizar reviews");
    }
  }
}
