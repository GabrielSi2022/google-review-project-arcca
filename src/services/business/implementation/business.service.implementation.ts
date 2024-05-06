import { Business } from "../../../entities/business";
import { BusinessRepository } from "../../../repositories/business/business.repositoy";
import {
  BusinessService,
  CreateOutputDtoBusiness,
  ListOutputDtoBusiness,
} from "../business.service";

export class BusinessServiceImplementation implements BusinessService {
  constructor(private readonly repository: BusinessRepository) {}

  static build(repository: BusinessRepository): BusinessServiceImplementation {
    return new BusinessServiceImplementation(repository);
  }

  async create(
    nameBusiness: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoBusiness> {
    try {
      const aBusiness = Business.create(
        nameBusiness,
        addressMap,
        addressReview,
        createdAt,
        updatedAt
      );
      await this.repository.save(aBusiness);

      return {
        business: {
          nameBusiness: aBusiness.nameBusiness,
          addressMap: aBusiness.addressMap,
          addressReview: aBusiness.addressReview,
          createdAt: aBusiness.createdAt,
          updatedAt: aBusiness.updatedAt,
        },
      };
    } catch (error: any) {
      throw new Error(`Falha ao criar a empresa: ${error.message}`);
    }
  }

  async list(): Promise<ListOutputDtoBusiness> {
    try {
      const aBusiness = await this.repository.list();

      const business = aBusiness.map((b) => ({
        nameBusiness: b.nameBusiness,
        addressMap: b.addressMap,
        addressReview: b.addressReview,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      }));

      return { business };
    } catch (error: any) {
      throw new Error(`Falha ao listar a empresa: ${error.message}`);
    }
  }
}
