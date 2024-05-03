import { Business } from "../../../entities/business";
import { BusinessRepository } from "../../../repositories/business/business.repositoy";
import {
  BusinessService,
  CreateOutputDtoBusiness,
  ListOutputDtoBusiness,
} from "../business.service";

export class BusinessServiceImplementation implements BusinessService {
  constructor(private readonly repository: BusinessRepository) {}

  public static build(repository: BusinessRepository) {
    return new BusinessServiceImplementation(repository);
  }

  public async create(
    nameBusiness: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoBusiness> {
    const aBusiness = Business.create(
      nameBusiness,
      addressMap,
      addressReview,
      createdAt,
      updatedAt
    );
    await this.repository.save(aBusiness);

    const output: CreateOutputDtoBusiness = {
      business: {
        nameBusiness: aBusiness.nameBusiness,
        addressMap: aBusiness.addressMap,
        addressReview: aBusiness.addressReview,
        createdAt: aBusiness.createdAt,
        updatedAt: aBusiness.updatedAt,
      },
    };
    return output;
  }

  public async list(): Promise<ListOutputDtoBusiness> {
    const aBusiness = await this.repository.list();

    const business = aBusiness.map((b) => {
      return {
        nameBusiness: b.nameBusiness,
        addressMap: b.addressMap,
        addressReview: b.addressReview,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      };
    });

    const output: ListOutputDtoBusiness = {
      business: business,
    };

    return output;
  }
}
