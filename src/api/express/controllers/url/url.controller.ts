import axios from "axios";
import { Request, Response } from "express";
import { getUrl } from "../../../../components/getUrl";

export class UrlController {
  private constructor() {}

  public static build() {
    return new UrlController();
  }

  public async create(req: Request, res: Response) {
    const { url } = req.body;

    const { nameBusiness, id, addressMap, addressReview } = await getUrl(url);

    const { data } = await axios.post(
      "http://localhost:3000/business/create",
      { nameBusiness, id, addressMap, addressReview }
    );

    res.status(201).json(data);
  }
}
