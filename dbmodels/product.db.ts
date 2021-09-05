import { Schema, model } from "mongoose";
import Product from "../models/product";
const productSchema = new Schema<Product>({
  price: Number,
  quantity: Number,
  identifier: String,
  description: String,
  image: String,
});
const productModel = model<Product>("Product", productSchema);
export default productModel;
