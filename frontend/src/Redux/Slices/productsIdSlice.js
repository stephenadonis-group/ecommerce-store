import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsAPI } from "../../api/endpoints";

export const fetchProductsById = createAsyncThunk(
  "products/fetchProductsById",
  async ({ id }) => {
    return await productsAPI.getById(id);
  }
);

const initialState = {
  responeId: null,
  status: "idle",
};

const productIDSlice = createSlice({
  name: "productsID",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchProductsById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsById.fulfilled, (state, action) => {
      state.responeId = action.payload;
      state.status = "succeeded";
    });
  },
});

export default productIDSlice.reducer;
