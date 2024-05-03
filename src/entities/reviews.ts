export type ReviewsProps = {
  classification: number;
  date: Date;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Reviews {
  private constructor(readonly props: ReviewsProps) {}
  public static create(
    classification: number,
    date: Date,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Reviews({
      classification,
      date,
      text,
      createdAt,
      updatedAt,
    });
  }

  public static with(
    classification: number,
    date: Date,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Reviews({
      classification,
      date,
      text,
      createdAt,
      updatedAt,
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

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
