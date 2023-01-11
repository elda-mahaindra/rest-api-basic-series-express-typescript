import { Request, Response } from "express";

import { IProduct } from "../../models/product";
import { runningStorage } from "../../storage";

const handleCreate = (req: Request, res: Response) => {
  const product = req.body as IProduct;

  const createdProduct = runningStorage.productStorage.save(product);

  const response = {
    id: createdProduct.id,
    message: "create product succeeded",
  };

  res.status(200).json(response);
};

export default handleCreate;
