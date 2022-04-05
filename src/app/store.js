import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "../features/currenciesSlice";
import categoriesReducer from "../features/categoriesSlice";
import productsInCartReducer from "../features/productsInCartSlice";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    categories: categoriesReducer,
    productsInCart: productsInCartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState,
});

store.subscribe(() => {
  // save a copy to localStorage
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
