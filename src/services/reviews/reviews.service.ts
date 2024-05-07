export type ListOutputDtoReviews = {
  reviews: {
    classification: number;
    date: Date;
    text: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    reviewsId: string;
  }[];
};

export type CreateOutputDtoReviews = {
  reviews: {
    classification: number;
    date: Date;
    text: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    reviewsId: string;
  };
};

export interface ReviewsService {
  create(
    classification: number,
    date: Date,
    text: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    reviewsId: string
  ): Promise<CreateOutputDtoReviews>;
  list(): Promise<ListOutputDtoReviews>;
}
