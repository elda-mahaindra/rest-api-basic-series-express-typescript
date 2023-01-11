import { json, urlencoded } from "express";

import App from "./app";
import PingRouterExtender from "./routers/ping";
import ProductRouterExtender from "./routers/product";

new App()
  .withMiddleware(urlencoded({ extended: false }))
  .withMiddleware(json())
  .extendRouter(new PingRouterExtender())
  .extendRouter(new ProductRouterExtender())
  .start();
