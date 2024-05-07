export type ListOutputDtoBusiness = {
  business: {
    nameBusiness: string;
    id: string;
    addressMap: string;
    addressReview: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type CreateOutputDtoBusiness = {
  business: {
    nameBusiness: string;
    id: string;
    addressMap: string;
    addressReview: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export interface BusinessService {
  create(
    nameBusiness: string,
    id: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoBusiness>;
  list(): Promise<ListOutputDtoBusiness>;
}
