import { Reviews } from "../../../entities/reviews";
import { ReviewsRepository } from "../../../repositories/reviews/reviews.repository";
import {
  CreateOutputDtoReviews,
  ListOutputDtoReviews,
  ReviewsService,
} from "../reviews.service";

export class ReviewsServiceImplementation implements ReviewsService {
  constructor(private readonly repository: ReviewsRepository) {}

  static build(repository: ReviewsRepository): ReviewsServiceImplementation {
    return new ReviewsServiceImplementation(repository);
  }

  async create(
    classification: number,
    date: Date,
    text: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<CreateOutputDtoReviews> {
    try {
      const review = Reviews.create(
        classification,
        date,
        text || "",
        answer || "",
        createdAt || new Date(),
        updatedAt || new Date()
      );

      await this.repository.save(review);

      return {
        reviews: {
          classification: review.classification,
          date: review.date,
          text: review.text,
          answer: review.answer,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        },
      };
    } catch (error: any) {
      throw new Error(`Falha ao criar o review: ${error.message}`);
    }
  }

  async list(): Promise<ListOutputDtoReviews> {
    try {
      const reviews = await this.repository.list();

      const output: ListOutputDtoReviews = {
        reviews: reviews.map((review) => ({
          classification: review.classification,
          date: review.date,
          text: review.text,
          answer: review.answer,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        })),
      };

      return output;
    } catch (error: any) {
      throw new Error(`Falha ao listar os reviews: ${error.message}`);
    }
  }
}
