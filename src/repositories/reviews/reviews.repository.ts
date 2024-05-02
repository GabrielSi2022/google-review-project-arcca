import { Reviews } from "../../entities/reviews";

export interface ReviewsRepository {
  save(reviews: Reviews): Promise<void>;
  list(): Promise<Reviews[]>;
}
