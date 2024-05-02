export type BusinessProps = {
  name: string;
  linkMap: string;
  linkReview: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Business {
  private constructor(readonly props: BusinessProps) {}
  public static create(
    name: string,
    linkMap: string,
    linkReview: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Business({ name, linkMap, linkReview, createdAt, updatedAt });
  }

  public static with(
    name: string,
    linkMap: string,
    linkReview: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Business({
      name,
      linkMap,
      linkReview,
      createdAt,
      updatedAt,
    });
  }

  public get name() {
    return this.props.name;
  }

  public get linkMap() {
    return this.props.linkMap;
  }

  public get linkReview() {
    return this.props.linkReview;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
