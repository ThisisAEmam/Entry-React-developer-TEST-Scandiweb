import { createSlice } from "@reduxjs/toolkit";

export const productsInCartSlice = createSlice({
  name: "productsInCart",
  initialState: [],
  reducers: {
    addProductToCart: (state, action) => {
      if (!action.payload.inStock) {
        return [...state];
      }
      return [...state, { ...action.payload, amount: 1 }];
    },
    removeProductFromCart: (state, action) => {
      const id = action.payload.id;
      const idx = state.findIndex((obj) => obj.id === id);
      if (idx !== -1) {
        state.splice(idx, 1);
      }
      return state;
    },
    addOneToProduct: (state, action) => {
      const id = action.payload.id;
      const idx = state.findIndex((obj) => obj.id === id);
      if (idx !== -1) {
        state[idx].amount += 1;
      }
      return state;
    },
    subtractOneFromProduct: (state, action) => {
      const id = action.payload.id;
      const idx = state.findIndex((obj) => obj.id === id);
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
  removeProductFromCart,
} = productsInCartSlice.actions;

export default productsInCartSlice.reducer;
