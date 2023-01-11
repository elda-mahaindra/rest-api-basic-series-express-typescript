import ProductStorage from "./product";

interface IRunningStorage {
  productStorage: ProductStorage;
}

export const runningStorage: IRunningStorage = {
  productStorage: new ProductStorage(),
};
