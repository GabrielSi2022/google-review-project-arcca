import { Business } from "../../entities/business";

export interface BusinessRepository {
  save(business: Business): Promise<void>;
  list(): Promise<Business[]>;
}
