export type ListUserReviewsOutputDto = {
  userReviews: {
    id: string;
    name: string;
    imgUrl: string;
  }[];
};

export type CreateUserReviewsOutputDto = {
  userReviews: {
    id: string;
    name: string;
    imgUrl: string;
  };
};
export interface UserReviewsService {
  create(
    id: string,
    name: string,
    imgUrl: string
  ): Promise<CreateUserReviewsOutputDto>;
  list(): Promise<ListUserReviewsOutputDto>;
}
