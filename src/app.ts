import dotenv from "dotenv";
import express, {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";

import { ErrorEnum } from "./enums/error";
import { IRouterExtender } from "./routers/common";

class App {
  private _app: Application;
  private _requestHandlerMiddleware: RequestHandler[];
  private _routerExtenders: IRouterExtender[];

  constructor() {
    this._app = express();
    this._requestHandlerMiddleware = [];
    this._routerExtenders = [];
  }

  private implementMiddlewares() {
    this._requestHandlerMiddleware.forEach((middleware) =>
      this._app.use(middleware)
    );
  }

  private routes() {
    const router = Router();

    this._routerExtenders.forEach((routerExtender) =>
      routerExtender.extend(router)
    );

    this._app.use("/api/", router);

    this._app.use((req, res, next) => {
      const error = new Error(ErrorEnum.REQUEST_NOT_RECOGNIZED);

      const response = {
        error,
        message: "request not recognized",
      };

      res.status(400).json(response);
    });

    this._app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        const response = {
          error: err,
          message: err.message,
        };

        res.status(500).json(response);
      }
    );
  }

  public extendRouter(routerExtender: IRouterExtender) {
    this._routerExtenders.push(routerExtender);

    return this;
  }

  public withMiddleware(middleware: RequestHandler) {
    this._requestHandlerMiddleware.push(middleware);

    return this;
  }

  public start() {
    dotenv.config();

    const host = process.env.HOST;
    const port = process.env.PORT;

    if (!host || !port) throw new Error(ErrorEnum.UNABLE_TO_READ_ENV);

    this.implementMiddlewares();
    this.routes();

    this._app.listen(port, () => {
      console.log(
        `server started. \nserver is running on http://${host}:${port}`
      );
    });
  }
}

export default App;
