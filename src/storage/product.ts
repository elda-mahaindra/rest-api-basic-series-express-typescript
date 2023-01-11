import { StorageBase } from "./base";
import { ErrorEnum } from "../enums/error";
import { IProduct } from "../models/product";

class ProductStorage extends StorageBase<IProduct> {
  public delete(id: string) {
    this.getById(id);

    this.clear(id);
  }

  public getById(id: string) {
    const product = this.get(id);

    if (!product) throw new Error(ErrorEnum.ITEM_NOT_FOUND);

    return product;
  }

  public populate() {
    return this.list();
  }

  public save(product: IProduct) {
    product.id = this.getNewId();

    this.set(product.id, product);

    return this.getById(product.id);
  }

  public update(id: string, product: IProduct) {
    this.getById(id);

    const { id: _, ...rest } = product;

    this.set(id, { id, ...rest });

    return this.getById(id);
  }
}

export default ProductStorage;
