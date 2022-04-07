import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "../features/currenciesSlice";
import categoriesReducer from "../features/categoriesSlice";
import productsInCartReducer from "../features/productsInCartSlice";
import productAddedNotificationReducer from "../features/productAddedNotifSlice";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    categories: categoriesReducer,
    productsInCart: productsInCartReducer,
    productAddedNotification: productAddedNotificationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
