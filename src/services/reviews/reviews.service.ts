export type ListOutputDtoReviews = {
  reviews: {
    rating: number;
    approximatedDate: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export interface ReviewsService {
  list(): Promise<ListOutputDtoReviews>;
}
