import { ReviewsRepository } from "../../../repositories/reviews/reviews.repository";
import { ListOutputDtoReviews, ReviewsService } from "../reviews.service";

export class ReviewsServiceImplementation implements ReviewsService {
  private constructor(readonly repository: ReviewsRepository) {
    return new ReviewsServiceImplementation(repository);
  }

  public async list(): Promise<ListOutputDtoReviews> {
    const aReviews = await this.repository.list();

    const reviews = aReviews.map((r) => {
      return {
        rating: r.rating,
        approximatedDate: r.approximatedDate,
        text: r.text,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      };
    });

    const output: ListOutputDtoReviews = {
      reviews: aReviews,
    };

    return output;
  }
}
