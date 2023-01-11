import { Router } from "express";

export interface IRouterExtender {
  extend(router: Router): void;
}
