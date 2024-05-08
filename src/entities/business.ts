export type BusinessProps = {
  nameBusiness: string;
  id: string;
  addressMap: string;
  addressReview: string
};

export class Business {
  private constructor(readonly props: BusinessProps) {}
  public static create(
    nameBusiness: string,
    id: string,
    addressMap: string,
    addressReview: string
  ) {
    return new Business({
      nameBusiness,
      id,
      addressMap,
      addressReview
    });
  }

  public static with(
    nameBusiness: string,
    id: string,
    addressMap: string,
    addressReview: string
  ) {
    return new Business({
      nameBusiness,
      id,
      addressMap,
      addressReview
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
}
