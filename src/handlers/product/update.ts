import { Request, Response } from "express";

import { ErrorEnum } from "../../enums/error";
import { IProduct } from "../../models/product";
import { runningStorage } from "../../storage";

const handleUpdate = (req: Request, res: Response) => {
  const { product_id } = req.params;

  const product = req.body as IProduct;

  try {
    const updatedProduct = runningStorage.productStorage.update(
      product_id,
      product
    );

    const response = {
      message: "update product succeeded",
      product: updatedProduct,
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

export default handleUpdate;
