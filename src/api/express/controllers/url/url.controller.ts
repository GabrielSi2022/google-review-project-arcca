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

    const response = await getUrl(url);

    await axios.post("http://localhost:3000/business/create", response);

    const responseData = {
      response,
    };

    res.status(201).json(responseData);
  }
}
