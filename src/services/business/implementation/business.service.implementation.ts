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
    id: string,
    addressMap: string,
    addressReview: string
  ): Promise<CreateOutputDtoBusiness> {
    try {
      const business = Business.create(
        nameBusiness,
        id,
        addressMap,
        addressReview
      );
      await this.repository.save(business);

      return { business };
    } catch (error: any) {
      throw new Error(`Falha ao criar a empresa: ${error.message}`);
    }
  }

  async list(): Promise<ListOutputDtoBusiness> {
    try {
      const business = await this.repository.list();

      return { business };
    } catch (error: any) {
      throw new Error(`Falha ao listar a empresa: ${error.message}`);
    }
  }
}
