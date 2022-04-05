import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesAPI } from "../graphQL/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const result = await fetchCategoriesAPI();
    return result;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    selected: "",
    status: "loading",
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      return {
        ...state,
        selected: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      return {
        ...state,
        status: "loading",
      };
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data.categories,
        selected: action.payload.data.categories[0].name,
        status: "success",
      };
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      return {
        ...state,
        status: "error",
      };
    });
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
