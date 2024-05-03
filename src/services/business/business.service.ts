export type ListOutputDtoBusiness = {
  business: {
    nameBusiness: string;
    addressMap: string;
    addressReview: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type CreateOutputDtoBusiness = {
  business: {
    nameBusiness: string;
    addressMap: string;
    addressReview: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export interface BusinessService {
  create(
    nameBusiness: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoBusiness>;
  list(): Promise<ListOutputDtoBusiness>;
}
