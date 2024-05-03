export type ListOutputDtoReviews = {
  reviews: {
    rating: number;
    approximatedDate: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type CreateOutputDtoReviews = {
  reviews: {
    rating: number;
    approximatedDate: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export interface ReviewsService {
  create(
    rating: number,
    approximatedDate: string,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoReviews>;
  list(): Promise<ListOutputDtoReviews>;
}
