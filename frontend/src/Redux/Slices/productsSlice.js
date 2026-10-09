import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsAPI } from "../../api/endpoints";

export const fetchProductsData = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, category, minPrice, maxPrice, rating, sort, search }) => {
    const params = { page, limit: 12, sort };
    if (search) params.search = search;
    if (category && category !== "All Categories") params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (rating) params.rating = rating;

    const [productsData, maxPriceData] = await Promise.all([
      productsAPI.getAll(params),
      productsAPI.getMaxPrice(),
    ]);

    return {
      allProducts: {
        products: productsData.products,
        total: productsData.total,
        maximumPrice: maxPriceData.maximumPrice,
      },
    };
  }
);

const initialState = {
  status: "idle",
  productsResponse: {
    products: [],
    total: 0,
    maximumPrice: 0,
  },
  filters: {
    category: "All Categories",
    minPrice: 0,
    maxPrice: null,
    rating: 0,
    search: "",
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setFilters: (state, acton) => {
      state.filters = acton.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProductsData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsData.fulfilled, (state, action) => {
      state.productsResponse = action.payload.allProducts;
      state.status = "succeeded";
    });
  },
});

export const { setFilters } = productSlice.actions;

export default productSlice.reducer;
