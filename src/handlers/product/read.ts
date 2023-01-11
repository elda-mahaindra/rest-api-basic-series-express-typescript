import { Request, Response } from "express";

import { ErrorEnum } from "../../enums/error";
import { runningStorage } from "../../storage";

const handleRead = (req: Request, res: Response) => {
  const limit = req.query.limit as string;

  try {
    let products = runningStorage.productStorage.populate();

    if (typeof limit === "string") {
      const parsedLimit = parseInt(limit);

      if (parsedLimit) products = products.slice(0, parsedLimit);
      else throw new Error(ErrorEnum.INVALID_REQUEST_QUERY);
    }

    const response = {
      message: "read products succeeded",
      products,
    };

    res.status(200).json(response);
  } catch (error: any) {
    if (error.message === ErrorEnum.INVALID_REQUEST_QUERY) {
      const response = {
        error,
        message: "invalid request query",
      };

      res.status(400).json(response);
    } else {
      const response = {
        message: "something went wrong, please try again later",
      };

      res.status(500).json(response);
    }
  }
};

export default handleRead;
