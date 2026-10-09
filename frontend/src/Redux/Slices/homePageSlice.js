import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsAPI, categoriesAPI } from "../../api/endpoints";

export const fetchHomeData = createAsyncThunk(
  "homePage/fetchProducts",
  async () => {
    const [allProductsData, categoryResponse, featuredData, ...bestSellerResponses] =
      await Promise.all([
        productsAPI.getAll({ page: 1, limit: 200, sort: "featured" }),
        categoriesAPI.getAll(),
        productsAPI.getAll({ page: 1, limit: 12, sort: "rating" }),
        ...["smartphones", "laptops", "tablets"].map((category) =>
          productsAPI.getAll({ category, page: 1, limit: 6, sort: "featured" }),
        ),
      ]);

    const featuredProduct = featuredData.products
      .filter((product) => product.rating >= 4.0)
      .slice(0, 6);

    const showCategories = await Promise.all(
      categoryResponse.map(async (category) => {
        if (category.image) return { ...category };
        const res = await productsAPI.getAll({
          category: category.slug,
          page: 1,
          limit: 1,
        });
        return { ...category, image: res.products[0]?.thumbnail };
      }),
    );

    const bestSellerProducts = bestSellerResponses
      .flatMap((response) => response.products)
      .sort(() => Math.random() - 0.5);

    return {
      allProducts: allProductsData,
      featuredProduct,
      categoryResponse,
      showCategories,
      bestSellerProducts,
    };
  },
);

const initialState = {
  shopCart: [],
  allProducts: [],
  featuredProducts: [],
  categoryResponse: [],
  showCategories: [],
  bestSellerProducts: [],
  status: "idle",
};

const homePageSlice = createSlice({
  name: "home",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.allProducts = action.payload.allProducts;
      state.categoryResponse = action.payload.categoryResponse;
      state.showCategories = action.payload.showCategories;
      state.featuredProducts = action.payload.featuredProduct;
      state.bestSellerProducts = action.payload.bestSellerProducts;
      state.status = "succeeded";
    });
  },
});

export default homePageSlice.reducer;
