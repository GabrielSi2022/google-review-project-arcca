export type BusinessProps = {
  nameBusiness: string;
  id: string;
  addressMap: string;
  addressReview: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Business {
  private constructor(readonly props: BusinessProps) {}
  public static create(
    nameBusiness: string,
    id: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Business({
      nameBusiness,
      id,
      addressMap,
      addressReview,
      createdAt,
      updatedAt,
    });
  }

  public static with(
    nameBusiness: string,
    id: string,
    addressMap: string,
    addressReview: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new Business({
      nameBusiness,
      id: nameBusiness,
      addressMap,
      addressReview,
      createdAt,
      updatedAt,
    });
  }

  public get nameBusiness() {
    return this.props.nameBusiness;
  }

  public get id() {
    return this.props.id;
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
