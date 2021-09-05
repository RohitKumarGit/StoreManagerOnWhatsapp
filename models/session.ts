import { Document } from "mongoose";
import { STATES } from "../config/constants";
export class Session extends Document {
  currentState: STATES;
  phone: string;
  payload?: any;
}
