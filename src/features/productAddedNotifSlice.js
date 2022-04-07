import { createSlice } from "@reduxjs/toolkit";

export const productAddedNotifSlice = createSlice({
  name: "productAddedNotification",
  initialState: { name: "", show: false },
  reducers: {
    setProductAddedNotification: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setProductAddedNotification } = productAddedNotifSlice.actions;

export default productAddedNotifSlice.reducer;
