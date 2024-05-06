import { UserReviews } from "../../../entities/userReviews";
import { UserReviewsRepository } from "../../../repositories/userReviews/userReviews.repository";
import {
  CreateUserReviewsOutputDto,
  ListUserReviewsOutputDto,
  UserReviewsService,
} from "../userReviews.service";

export class UserReviewsServiceImplementation implements UserReviewsService {
  constructor(private readonly repository: UserReviewsRepository) {}

  static build(
    repository: UserReviewsRepository
  ): UserReviewsServiceImplementation {
    return new UserReviewsServiceImplementation(repository);
  }

  async create(
    id: string,
    name: string,
    imgUrl: string
  ): Promise<CreateUserReviewsOutputDto> {
    try {
      const userReview = UserReviews.create(id, name, imgUrl);
      await this.repository.save(userReview);

      return {
        userReviews: {
          id: userReview.id,
          name: userReview.name,
          imgUrl: userReview.imgUrl,
        },
      };
    } catch (error: any) {
      throw new Error(`Falha ao criar os reviews: ${error.message}`);
    }
  }

  async list(): Promise<ListUserReviewsOutputDto> {
    try {
      const userReviews = await this.repository.list();

      return {
        userReviews: userReviews.map((userReview) => ({
          id: userReview.id,
          name: userReview.name,
          imgUrl: userReview.imgUrl,
        })),
      };
    } catch (error: any) {
      throw new Error(`Falha ao listar os reviews: ${error.message}`);
    }
  }
}
