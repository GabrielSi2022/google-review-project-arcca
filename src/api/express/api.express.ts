import express, { Express, Request, Response } from "express";

import { Api } from "../api";
import serverless from "serverless-http";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  public addGetRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.get(path, handle);
  }

  public addPostRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.post(path, handle);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log("Server runing on port" + port);
      this.printRoutes();
    });
  }
  public lambda() {
    module.exports.handler = serverless(this.app);
  }

  private printRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });

    console.log(routes);
  }
}
