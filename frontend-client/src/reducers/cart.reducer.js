import { CART_ACTION_TYPES } from "../constants/cart.type";

const findCartItemIndex = (cartItems, productId) => {
    return cartItems.findIndex((item) => item.id === productId);
};
const INITIAL_STATE = {
    cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.TOGGLE_CART_ITEM:
            const existingIndex = findCartItemIndex(
                state.cartItems,
                action.payload.id
            );

            if (existingIndex === -1) {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload }],
                };
            } else {
                const updatedCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
        default:
            return state;
    }
};
