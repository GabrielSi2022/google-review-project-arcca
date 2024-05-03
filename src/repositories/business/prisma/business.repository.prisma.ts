import { PrismaClient } from "@prisma/client";
import { Business } from "../../../entities/business";
import { BusinessRepository } from "../business.repositoy";

export class BusinessRepositoryPrisma implements BusinessRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new BusinessRepositoryPrisma(prisma);
  }

  public async save(business: Business): Promise<void> {
    const data = {
      nameBusiness: business.nameBusiness,
      addressMap: business.addressMap,
      addressReview: business.addressReview,
      createdAt: business.createdAt,
      updatedAt: business.updatedAt,
    };

    await this.prisma.business.create({ data });
  }

  public async list(): Promise<Business[]> {
    const aBusiness = await this.prisma.business.findMany();

    const business: Business[] = aBusiness.map((b) => {
      const { nameBusiness, addressMap, addressReview, createdAt, updatedAt } =
        b;
      return Business.with(
        nameBusiness,
        addressMap,
        addressReview,
        createdAt,
        updatedAt
      );
    });

    return business;
  }
}
