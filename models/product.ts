import { Document } from "mongoose";

export default class Product extends Document {
  identifier: string;
  price: Number;
  quantity: Number;
  description: String;
  image?: String;

  save: any;
}
