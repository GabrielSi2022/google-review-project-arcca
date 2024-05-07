import { ApiExpress } from "./api/express/api.express";
import { BusinessController } from "./api/express/controllers/business/business.controller";
import { ReviewsController } from "./api/express/controllers/reviews/reviews.controller";
import { UserReviewsController } from "./api/express/controllers/userReviews/userReviews.controller";

function main() {
  const api = ApiExpress.build();

  const controllerBusiness = BusinessController.build();
  const controllerReviews = ReviewsController.build();
  const controllerUserReviews = UserReviewsController.build();
  api.addGetRoute("/business", controllerBusiness.list);
  api.addPostRoute("/business/create", controllerBusiness.create);
  api.addGetRoute("/reviews", controllerReviews.list);
  api.addPostRoute("/reviews/create", controllerReviews.create);
  api.addGetRoute("/userReviews", controllerUserReviews.list);
  api.addPostRoute("/userReviews/create", controllerUserReviews.create);

  api.lambda();
}

main();
