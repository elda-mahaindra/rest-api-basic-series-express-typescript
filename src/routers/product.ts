import { Router } from "express";

import { IRouterExtender } from "./common";
import * as ROUTES from "../constants/routes";
import handleCreate from "../handlers/product/create";
import handleDelete from "../handlers/product/delete";
import handleRead from "../handlers/product/read";
import handleReadById from "../handlers/product/read_by_id";
import handleUpdate from "../handlers/product/update";

class ProductRouterExtender implements IRouterExtender {
  extend(router: Router) {
    router.route(`${ROUTES.PRODUCT}/`).get(handleRead).post(handleCreate);

    router
      .route(`${ROUTES.PRODUCT}/:product_id`)
      .get(handleReadById)
      .put(handleUpdate)
      .delete(handleDelete);
  }
}

export default ProductRouterExtender;
