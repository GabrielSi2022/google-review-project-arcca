export type ListOutputDtoBusiness = {
  business: {
    name: string;
    linkMap: string;
    linkReview: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type CreateOutputDtoBusiness = {
  business: {
    name: string;
    linkMap: string;
    linkReview: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export interface BusinessService {
  create(
    name: string,
    linkMap: string,
    linkReview: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoBusiness>;
  list(): Promise<ListOutputDtoBusiness>;
}
