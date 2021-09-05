import { STATES } from "../config/constants";
import { Session } from "../models/session";
import Product from "../models/product";

import storeModel from "../dbmodels/store.db";
import sessionModel from "../dbmodels/session.db";
import productModel from "../dbmodels/product.db";

export const getCurrentSession = async (
  phoneNumber: string
): Promise<Session> => {
  let session = await sessionModel.findOne({
    phone: phoneNumber,
  });
  if (!session) {
    console.log("creating session");
    session = await sessionModel.create({
      phone: phoneNumber,
      currentState: STATES.MENU,
    });
    console.log(session);
  }
  return session;
};
export const setNextState = async (
  nextState: STATES | undefined,
  sessionId: string
) => {
  const session = await sessionModel.findById(sessionId);
  if (nextState === STATES.MENU) {
    if (session.payload && session.payload.productId) {
      delete session.payload.productId;
      delete session.payload.editProduct;
    }
  }
  if (session) {
    session.currentState = nextState;
    await session.save();
  }
};
export const createStore = async (name: string, phone: any) => {
  const session = await sessionModel.findOne({ phone });
  if (session) {
    session.payload = { storeName: name };
    await session.save();
    console.log(session);
    await storeModel.create({ name });
  }
};
export const addProductName = async (productName: string, phone: any) => {
  const session = await sessionModel.findOne({ phone });

  const store = await storeModel.findOne({ name: session.payload.storeName });
  const product: Product = await productModel.create({
    identifier: productName,
  });

  session.payload.productId = product._id;
  // @ts-ignore
  store.products.push(product._id);
  console.log(session);
  await session.save();
  await store.save();
};
export const addProductDescription = async (desc: string, phone: any) => {
  const session = await sessionModel.findOne({ phone });
  console.log(session);
  console.log(session.payload);
  console.log(session.payload.productId);
  const product: Product = await productModel.findById(
    session.payload.productId
  );
  product.description = desc;
  await product.save();
};
export const addProductPrice = async (price: number, phone: any) => {
  const session = await sessionModel.findOne({ phone });
  const product: Product = await productModel.findById(
    session.payload.productId
  );
  product.price = price;
  await product.save();
};
export const addProductQuantity = async (quant: number, phone: any) => {
  const session = await sessionModel.findOne({ phone });

  const product = await productModel.findById(session.payload.productId);

  product.quantity = quant;

  await product.save();
};
export const addProductImage = async (image: string, phone: any) => {
  const session = await sessionModel.findOne({ phone });
  const product = await productModel.findById(session.payload.productId);
  product.image = image;
  delete session.payload.productId;
  await product.save();
};
export const getProducts = async (phone) => {
  const session = await sessionModel.findOne({ phone });
  const store = await storeModel
    .findOne({ name: session.payload.storeName })
    .populate("products");

  console.log(store);
  var ret = "";
  if (!store.products) {
    return (ret += "No products in inventory");
  }
  store.products.forEach((product: Product) => {
    ret +=
      "\n Name : " +
      product.identifier +
      " | price : Rs " +
      product.price +
      " | quantity: " +
      product.quantity;
  });
  return ret;
};
export const editProduct = async (identifier, phone) => {
  const product = await productModel.findOne({ identifier });
  console.log(product);
  if (!product) {
    return Promise.reject("Please enter a correct identifier.");
  }
  const session = await sessionModel.findOne({ phone });
  session.payload.editProduct = product._id;
  console.log(session);
  await session.save();
};
export const changeInventory = async (newInventory, phone) => {
  console.log("changing inventory");
  const session = await sessionModel.findOne({ phone });
  console.log(session);
  const product = await productModel.findById(session.payload.editProduct);
  product.quantity = newInventory;
  console.log(product);
  await product.save();
  delete session.payload.editProduct;
  await session.save();
};
