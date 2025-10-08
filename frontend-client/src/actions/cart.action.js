// cartActions.js
import { CART_ACTION_TYPES } from "../constants/cart.type";

export const addToCart = (productToAdd) => ({
    type: CART_ACTION_TYPES.TOGGLE_CART_ITEM,
    payload: productToAdd,
});
