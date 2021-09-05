import { menuOptions } from "../config/constants";
import productModel from "../dbmodels/product.db";
import sessionModel from "../dbmodels/session.db";

export const menuValidator = function (option: string) {
  if (!menuOptions.includes(option))
    throw new Error("Please enter a correct value");
  return true;
};
export const stringValidator = function () {
  return true;
};
export const storeStateValidator = async function (phone: any) {
  const session = await sessionModel.findOne({ phone });
  if (!session.payload.storeName) {
    return false;
  }
  return true;
};
export const numberValidator = function (inp: any) {
  if (isNaN(inp)) {
    throw new Error("Please enter a numeric value");
  }
};
