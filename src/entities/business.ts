export type BusinessProps = {
  nameBusiness: string;
  addressMap: string;
  addressReview: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Business {
  private constructor(readonly props: BusinessProps) {}
  public static create(
    nameBusiness: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Business({
      nameBusiness,
      addressMap,
      addressReview,
      createdAt,
      updatedAt,
    });
  }

  public static with(
    nameBusiness: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Business({
      nameBusiness,
      addressMap,
      addressReview,
      createdAt,
      updatedAt,
    });
  }

  public get nameBusiness() {
    return this.props.nameBusiness;
  }

  public get addressMap() {
    return this.props.addressMap;
  }

  public get addressReview() {
    return this.props.addressReview;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
