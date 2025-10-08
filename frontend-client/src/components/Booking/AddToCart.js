export const addCartItem = (cartItems, productToAdd) => {
    console.log(productToAdd.id);

    const existingCartItem = cartItems.find((item) => {
        console.log("existing", item.id);
        console.log("new", productToAdd.id);
        console.log(item.id === productToAdd.id);
    });

    if (existingCartItem) {
        const existing = cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );

        return existing;
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};
