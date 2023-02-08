import { randomUUID } from 'crypto';

interface CargoProps {
  nome: string;
}
export class Cargo {
  private _id: string;
  private _nome: string;
  constructor({ nome }: CargoProps, id?: string) {
    this._id = id ?? randomUUID();
    this._nome = nome;
  }
  get id() {
    return this._id;
  }
  get nome() {
    return this._nome;
  }
}
