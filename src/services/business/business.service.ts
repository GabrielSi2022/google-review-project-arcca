export type ListOutputDtoBusiness = {
  business: {
    nameBusiness: string;
    id: string;
    addressMap: string;
    addressReview: string;
  }[];
};

export type CreateOutputDtoBusiness = {
  business: {
    nameBusiness: string;
    id: string;
    addressMap: string;
    addressReview: string;
  };
};

export interface BusinessService {
  create(
    nameBusiness: string,
    id: string,
    addressMap: string,
    addressReview: string
  ): Promise<CreateOutputDtoBusiness>;
  list(): Promise<ListOutputDtoBusiness>;
}
