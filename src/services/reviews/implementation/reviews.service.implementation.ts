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
    text: string,
    answer: string,
    userId: string,
    reviewsId: string,
    businessId: string
  ): Promise<CreateOutputDtoReviews> {
    try {

      const reviews = Reviews.create(
        classification,
        text || "",
        answer || "",
        userId,
        reviewsId,
        businessId
      );

      await this.repository.save(reviews);
      
      return { reviews };
    } catch (error: any) {
      throw new Error(`Falha ao criar o review: ${error.message}`);
    }
  }

  async list(): Promise<ListOutputDtoReviews> {
    try {
      const reviews = await this.repository.list();

      return { reviews };

    } catch (error: any) {
      throw new Error(`Falha ao listar os reviews: ${error.message}`);
    }
  }
}
