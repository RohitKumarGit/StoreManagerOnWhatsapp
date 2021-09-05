import {
  addProductDescription,
  addProductImage,
  addProductName,
  addProductPrice,
  addProductQuantity,
  changeInventory,
  createStore,
  editProduct,
} from "../handlers";
import { State } from "../models/state";
import {
  menuValidator,
  numberValidator,
  storeStateValidator,
  stringValidator,
} from "../utils/validators";
import { STATES } from "./constants";
type stateType = {
  [key in STATES]?: State;
};
// TODO
// MENU
// CREATE_STORE
export const States: stateType = {
  [STATES.MENU]: {
    stateCode: STATES.MENU,
    message: `
       Please choose one of the option to proceed further :
       0. Create Store  
       1. Add product to inventory
       2. View Inventory  
       3. Edit Inventory 
    `,
    responseValidator: [menuValidator],
  },
  [STATES.STORE_NAME]: {
    stateCode: STATES.STORE_NAME,
    message: "Please enter the name of the new store",
    successMessage: "Store has been created!",
    responseValidator: [stringValidator],
    handler: createStore,
    nextState: STATES.MENU,
    customMessage: "Store has been created!",
  },
  [STATES.PRODUCT_UNIQUE_IDENTIFIER]: {
    stateCode: STATES.PRODUCT_UNIQUE_IDENTIFIER,
    message: "Please enter the unique identifier of the product",
    responseValidator: [stringValidator],
    handler: addProductName,
    nextState: STATES.PRODUCT_DESC,
  },
  [STATES.PRODUCT_DESC]: {
    stateCode: STATES.PRODUCT_DESC,
    message: "Please description of the product",
    responseValidator: [stringValidator],
    handler: addProductDescription,
    nextState: STATES.PRODUCT_PRICE,
  },
  [STATES.PRODUCT_PRICE]: {
    stateCode: STATES.PRODUCT_PRICE,
    message: "Please provide price of the product",
    responseValidator: [numberValidator],
    handler: addProductPrice,
    nextState: STATES.PRODUCT_QUANTITY,
  },
  [STATES.PRODUCT_QUANTITY]: {
    stateCode: STATES.PRODUCT_QUANTITY,
    message: "Please provide quantity of the product",
    responseValidator: [numberValidator],
    handler: addProductQuantity,
    nextState: STATES.PRODUCT_IMAGE,
  },
  [STATES.PRODUCT_IMAGE]: {
    stateCode: STATES.PRODUCT_IMAGE,
    message: "add image of the product",
    responseValidator: [stringValidator],
    handler: addProductImage,
    successMessage: "Product has been added succesfully!",
    nextState: STATES.MENU,
  },
  [STATES.EDIT_INVENTORY_PRODUCT_ID]: {
    stateCode: STATES.EDIT_INVENTORY_PRODUCT_ID,
    message: "What's the unique identifier of the product?",
    responseValidator: [stringValidator],
    handler: editProduct,

    nextState: STATES.EDIT_INVENTORY_NEW_INVENTORY,
  },
  [STATES.EDIT_INVENTORY_NEW_INVENTORY]: {
    stateCode: STATES.EDIT_INVENTORY_NEW_INVENTORY,
    message: "What's the new inventory of the product?",
    responseValidator: [numberValidator],
    handler: changeInventory,
    successMessage: "Inventory has been changed",
    nextState: STATES.MENU,
  },
};
