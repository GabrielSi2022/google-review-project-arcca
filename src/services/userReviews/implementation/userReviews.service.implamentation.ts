import { UserReviews } from "../../../entities/userReviews";
import { UserReviewsRepository } from "../../../repositories/userReviews/userReviews.repository";
import {
  CreateUserReviewsOutputDto,
  ListUserReviewsOutputDto,
  UserReviewsService,
} from "../userReviews.service";

export class UserReviewsServiceImplementation implements UserReviewsService {
  private constructor(readonly repository: UserReviewsRepository) {}

  public static build(repository: UserReviewsRepository) {
    return new UserReviewsServiceImplementation(repository);
  }

  public async create(
    id: string,
    name: string,
    imgUrl: string
  ): Promise<CreateUserReviewsOutputDto> {
    const aUserReviews = UserReviews.create(id, name, imgUrl);
    await this.repository.save(aUserReviews);

    const output: CreateUserReviewsOutputDto = {
      userReviews: {
        id: aUserReviews.id,
        name: aUserReviews.name,
        imgUrl: aUserReviews.imgUrl,
      },
    };
    return output;
  }

  public async list(): Promise<ListUserReviewsOutputDto> {
    const aUserReviews = await this.repository.list();

    const userReviews = aUserReviews.map((u) => {
      return {
        id: u.id,
        name: u.name,
        imgUrl: u.imgUrl,
      };
    });

    const output: ListUserReviewsOutputDto = {
      userReviews: userReviews,
    };

    return output;
  }
}
