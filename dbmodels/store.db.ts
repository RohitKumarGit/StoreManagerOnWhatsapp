import { Schema, model } from "mongoose";
import { Store } from "../models/store";

const storeSchema = new Schema<Store>({
  name: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
const storeModel = model<Store>("Store", storeSchema);
export default storeModel;
