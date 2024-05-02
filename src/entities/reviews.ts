export type ReviewsProps = {
  rating: number;
  approximatedDate: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Reviews {
  private constructor(readonly props: ReviewsProps) {}
  public static create(
    rating: number,
    approximatedDate: string,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Reviews({
      rating,
      approximatedDate,
      text,
      createdAt,
      updatedAt,
    });
  }

  public static with(
    rating: number,
    approximatedDate: string,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Reviews({
      rating,
      approximatedDate,
      text,
      createdAt,
      updatedAt,
    });
  }

  public get rating() {
    return this.props.rating;
  }

  public get approximatedDate() {
    return this.props.approximatedDate;
  }

  public get text() {
    return this.props.text;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
