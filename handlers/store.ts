import { Store } from "../models/store";
const storeModel = require("../dbmodels/store.db");
export class StoreHanlder extends Store {
  constructor(name) {
    super();
    this.name = name;
  }
  async create() {
    await storeModel.create({ name: this.name });
  }
}
