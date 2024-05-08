export type ListOutputDtoReviews = {
  reviews: {
    classification: number,
    text: string,
    answer: string,
    userId: string,
    reviewsId: string,
    businessId: string
  }[];
};

export type CreateOutputDtoReviews = {
  reviews: {
    classification: number,
    text: string,
    answer: string,
    userId: string,
    reviewsId: string,
    businessId: string
  };
};

export interface ReviewsService {
  create(
    classification: number,
    text: string,
    answer: string,
    userId: string,
    reviewsId: string,
    businessId: string
  ): Promise<CreateOutputDtoReviews>;
  list(): Promise<ListOutputDtoReviews>;
}
