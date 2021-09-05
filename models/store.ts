import { Document } from "mongoose";
import Product from "./product";

export class Store extends Document {
  name: String;
  products?: Product[];
}
