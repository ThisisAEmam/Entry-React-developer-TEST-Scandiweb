import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrenciesAPI } from "../graphQL/api";

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    const result = await fetchCurrenciesAPI();
    return result;
  }
);

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    data: [],
    selected: { label: "", symbol: "" },
    status: "loading",
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      return {
        ...state,
        selected: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrencies.pending, (state) => {
      return {
        ...state,
        status: "loading",
      };
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      const currencies = action.payload.data.currencies;
      return {
        ...state,
        data: currencies,
        selected: { ...currencies[0] },
        status: "success",
      };
    });
    builder.addCase(fetchCurrencies.rejected, (state) => {
      return {
        ...state,
        status: "error",
      };
    });
  },
});

export const { setSelectedCurrency } = currenciesSlice.actions;

export default currenciesSlice.reducer;
