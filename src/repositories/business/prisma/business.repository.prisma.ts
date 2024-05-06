import { PrismaClient } from "@prisma/client";
import { Business } from "../../../entities/business";
import { BusinessRepository } from "../business.repositoy";

export class BusinessRepositoryPrisma implements BusinessRepository {
  constructor(private readonly prisma: PrismaClient) {}

  static build(prisma: PrismaClient): BusinessRepositoryPrisma {
    return new BusinessRepositoryPrisma(prisma);
  }

  async save(business: Business): Promise<void> {
    try {
      const { nameBusiness, addressMap, addressReview, createdAt, updatedAt } =
        business;
      await this.prisma.business.create({
        data: { nameBusiness, addressMap, addressReview, createdAt, updatedAt },
      });
    } catch (error: any) {
      throw new Error(`Falha ao salvar a empresa: ${error.message}`);
    }
  }

  async list(): Promise<Business[]> {
    try {
      const businessesFromDB = await this.prisma.business.findMany();
      return businessesFromDB.map(
        ({ nameBusiness, addressMap, addressReview, createdAt, updatedAt }) =>
          Business.with(
            nameBusiness,
            addressMap,
            addressReview,
            createdAt,
            updatedAt
          )
      );
    } catch (error: any) {
      throw new Error(`Falha ao listar a empresa: ${error.message}`);
    }
  }
}
