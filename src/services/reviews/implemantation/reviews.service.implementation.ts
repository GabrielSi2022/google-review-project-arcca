import { Reviews } from "../../../entities/reviews";
import { ReviewsRepository } from "../../../repositories/reviews/reviews.repository";
import {
  CreateOutputDtoReviews,
  ListOutputDtoReviews,
  ReviewsService,
} from "../reviews.service";

export class ReviewsServiceImplementation implements ReviewsService {
  constructor(private readonly repository: ReviewsRepository) {}

  public static build(repository: ReviewsRepository) {
    return new ReviewsServiceImplementation(repository);
  }

  public async create(
    rating: number,
    approximatedDate: string,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoReviews> {
    const aReviews = Reviews.create(
      rating,
      approximatedDate,
      text,
      createdAt,
      updatedAt
    );
    await this.repository.save(aReviews);

    const output: CreateOutputDtoReviews = {
      reviews: {
        rating: aReviews.rating,
        approximatedDate: aReviews.approximatedDate,
        text: aReviews.text,
        createdAt: aReviews.createdAt,
        updatedAt: aReviews.updatedAt,
      },
    };
    return output;
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
      reviews: reviews,
    };

    return output;
  }
}
