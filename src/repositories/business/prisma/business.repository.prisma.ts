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
      name: business.name,
      linkMap: business.linkMap,
      linkReview: business.linkReview,
      createdAt: business.createdAt,
      updatedAt: business.updatedAt,
    };

    await this.prisma.business.create({ data });
  }

  public async list(): Promise<Business[]> {
    const aBusiness = await this.prisma.business.findMany();

    const business: Business[] = aBusiness.map((b) => {
      const { name, linkMap, linkReview, createdAt, updatedAt } = b;
      return Business.with(name, linkMap, linkReview, createdAt, updatedAt);
    });

    return business;
  }
}
