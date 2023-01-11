export class StorageBase<T> {
  private _autoIncrementId: number;
  private _record: Record<string, T>;

  constructor() {
    this._autoIncrementId = 0;
    this._record = {};
  }

  protected clear(id: string) {
    delete this._record[id];
  }

  protected get(id: string): T | undefined {
    return this._record[id];
  }

  protected getNewId() {
    this._autoIncrementId++;

    return this._autoIncrementId.toString();
  }

  protected list() {
    return Object.keys(this._record).map((key) => this._record[key]);
  }

  protected set(id: string, item: T) {
    this._record[id] = item;
  }
}
