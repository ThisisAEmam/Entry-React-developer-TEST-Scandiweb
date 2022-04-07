import { createSlice } from "@reduxjs/toolkit";

export const productsInCartSlice = createSlice({
  name: "productsInCart",
  initialState: [],
  reducers: {
    addProductToCart: (state, action) => {
      if (!action.payload.inStock) {
        return [...state];
      }
      const id = action.payload.id;
      const selectedAttr = action.payload.selectedAttr;
      const idx = state.findIndex(
        (product) =>
          product.id === id &&
          JSON.stringify(product.selectedAttr) === JSON.stringify(selectedAttr)
      );
      if (idx !== -1) {
        state[idx].amount += 1;
        return state;
      } else {
        return [
          ...state,
          {
            cartId: `${id}-${Math.floor(Math.random() * 1000000)}`,
            ...action.payload,
            amount: 1,
          },
        ];
      }
    },

    modifyProductInCart: (state, action) => {
      const cartId = action.payload.cartId;
      const idx = state.findIndex((obj) => obj.cartId === cartId);
      if (idx === -1) {
        return state;
      }
      const product = state[idx];
      Object.keys(action.payload.attributes).forEach((key) => {
        product.selectedAttr[key] = action.payload.attributes[key];
      });
      const idx2 = state.findIndex(
        (obj) =>
          obj.id === product.id &&
          obj.cartId !== product.cartId &&
          JSON.stringify(obj.selectedAttr) ===
            JSON.stringify(product.selectedAttr)
      );
      if (idx2 === -1) {
        state[idx] = { ...product };
      } else {
        state[idx2].amount += product.amount;
        state.splice(idx, 1);
      }
      return state;
    },

    addOneToProduct: (state, action) => {
      const cartId = action.payload.cartId;
      const idx = state.findIndex((obj) => obj.cartId === cartId);
      if (idx !== -1) {
        state[idx].amount += 1;
      }
      return state;
    },
    subtractOneFromProduct: (state, action) => {
      const cartId = action.payload.cartId;
      const idx = state.findIndex((obj) => obj.cartId === cartId);
      if (state[idx].amount === 1) {
        state.splice(idx, 1);
      } else {
        state[idx].amount -= 1;
      }
      return state;
    },
  },
});

export const {
  addProductToCart,
  addOneToProduct,
  subtractOneFromProduct,
  modifyProductInCart,
} = productsInCartSlice.actions;

export default productsInCartSlice.reducer;
