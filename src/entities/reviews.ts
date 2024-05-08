export type ReviewsProps = {
  classification: number;
  text: string;
  answer: string;
  userId: string;
  reviewsId: string;
  businessId: string;
};

export class Reviews {
  private constructor(readonly props: ReviewsProps) {}
  public static create(
    classification: number,
    text: string,
    answer: string,
    userId: string,
    reviewsId: string,
    businessId: string
  ) {
    return new Reviews({
      classification,
      text,
      answer,
      userId,
      reviewsId,
      businessId,
    })
  }

  public static with(
    classification: number,
    text: string,
    answer: string,
    userId: string,
    reviewsId: string,
    businessId: string
  ) {
    return new Reviews({
      classification,
      text,
      answer,
      userId,
      reviewsId,
      businessId,
    });
  }

  public get classification() {
    return this.props.classification;
  }


  public get text() {
    return this.props.text;
  }

  public get answer() {
    return this.props.answer;
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
