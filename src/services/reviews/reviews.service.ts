export type ListOutputDtoReviews = {
  reviews: {
    classification: number;
    date: Date;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type CreateOutputDtoReviews = {
  reviews: {
    classification: number;
    date: Date;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export interface ReviewsService {
  create(
    classification: number,
    date: Date,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoReviews>;
  list(): Promise<ListOutputDtoReviews>;
}
