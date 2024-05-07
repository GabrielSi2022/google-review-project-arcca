export type ReviewsProps = {
  classification: number;
  date: Date;
  text: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  reviewsId: string;
  businessId: string;
};

export class Reviews {
  private constructor(readonly props: ReviewsProps) {}
  public static create(
    classification: number,
    date: Date,
    text: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    reviewsId: string,
    businessId: string
  ) {
    return new Reviews({
      classification,
      date,
      text,
      answer,
      createdAt,
      updatedAt,
      userId,
      reviewsId,
      businessId,
    });
  }

  public static with(
    classification: number,
    date: Date,
    text: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    reviewsId: string,
    businessId: string
  ) {
    return new Reviews({
      classification,
      date,
      text,
      answer,
      createdAt,
      updatedAt,
      userId,
      reviewsId,
      businessId,
    });
  }

  public get classification() {
    return this.props.classification;
  }

  public get date() {
    return this.props.date;
  }

  public get text() {
    return this.props.text;
  }

  public get answer() {
    return this.props.answer;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public get userId() {
    return this.props.userId;
  }

  public get reviewsId() {
    return this.props.reviewsId;
  }

  public get businessId() {
    return this.props.businessId;
  }
}
