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
    classification: number,
    date: Date,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoReviews> {
    const aReviews = Reviews.create(
      classification,
      date,
      (text = text || ""),
      (createdAt = new Date()),
      (updatedAt = new Date())
    );
    await this.repository.save(aReviews);

    const output: CreateOutputDtoReviews = {
      reviews: {
        classification: aReviews.classification,
        date: aReviews.date,
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
        classification: r.classification,
        date: r.date,
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
