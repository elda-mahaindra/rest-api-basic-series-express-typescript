import { Request, Response } from "express";

import { ErrorEnum } from "../../enums/error";
import { runningStorage } from "../../storage";

const handleDelete = (req: Request, res: Response) => {
  const { product_id } = req.params;

  try {
    runningStorage.productStorage.delete(product_id);

    const response = {
      message: "delete product succeeded",
    };

    res.status(200).json(response);
  } catch (error: any) {
    if (error.message === ErrorEnum.ITEM_NOT_FOUND) {
      const response = {
        message: "item not found",
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

export default handleDelete;
