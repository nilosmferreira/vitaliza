import { randomUUID } from 'node:crypto';

export abstract class EntityBase<T> {
  protected _id: string;
  protected data: T;
  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID();
    this.data = props;
  }
  get id() {
    return this._id;
  }
}
