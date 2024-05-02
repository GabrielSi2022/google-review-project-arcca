import { Business } from "../../../entities/business";
import { BusinessRepository } from "../../../repositories/business/business.repositoy";
import {
  BusinessService,
  CreateOutputDtoBusiness,
  ListOutputDtoBusiness,
} from "../business.service";

export class BusinessServiceImplementation implements BusinessService {
  private constructor(readonly repository: BusinessRepository) {}

  public static build(repository: BusinessRepository) {
    return new BusinessServiceImplementation(repository);
  }

  public async create(
    name: string,
    linkMap: string,
    linkReview: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoBusiness> {
    const aBusiness = Business.create(
      name,
      linkMap,
      linkReview,
      createdAt,
      updatedAt
    );
    await this.repository.save(aBusiness);

    const output: CreateOutputDtoBusiness = {
      name: aBusiness.name,
      linkMap: aBusiness.linkMap,
      linkReview: aBusiness.linkReview,
      createdAt: aBusiness.createdAt,
      updatedAt: aBusiness.updatedAt,
    };
    return output;
  }

  public async list(): Promise<ListOutputDtoBusiness> {
    const aBusiness = await this.repository.list();

    const business = aBusiness.map((b) => {
      return {
        name: b.name,
        linkMap: b.linkMap,
        linkReview: b.linkReview,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      };
    });

    const output: ListOutputDtoBusiness = {
      business: aBusiness,
    };

    return output;
  }
}
