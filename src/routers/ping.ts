import { Router } from "express";

import { IRouterExtender } from "./common";
import * as ROUTES from "../constants/routes";
import handlePing from "../handlers/ping/ping";

class PingRouterExtender implements IRouterExtender {
  extend(router: Router): void {
    router.route(`${ROUTES.PING}/`).get(handlePing);
  }
}

export default PingRouterExtender;
