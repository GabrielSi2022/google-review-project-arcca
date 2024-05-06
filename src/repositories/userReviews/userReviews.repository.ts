import { UserReviews } from "../../entities/userReviews";

export interface UserReviewsRepository {
  save(user: UserReviews): Promise<void>;
  list(): Promise<UserReviews[]>;
}
