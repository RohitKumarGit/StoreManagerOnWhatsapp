import { Schema, model } from "mongoose";
import { Session } from "../models/session";

const sessionSchema = new Schema<Session>({
  currentState: String,
  phone: String,
  payload: {
    storeName: String,
    productId: Schema.Types.ObjectId,
    editProduct: String,
  },
});
const sessionModel = model<Session>("session", sessionSchema);
export default sessionModel;
