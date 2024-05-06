export type UserReviewsProps = {
  id: string;
  name: string;
  imgUrl: string;
};

export class UserReviews {
  private constructor(readonly props: UserReviewsProps) {}

  public static create(id: string, name: string, imgUrl: string) {
    return new UserReviews({
      id,
      name,
      imgUrl,
    });
  }

  public static with(id: string, name: string, imgUrl: string) {
    return new UserReviews({ id, name, imgUrl });
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get imgUrl() {
    return this.props.imgUrl;
  }
}
