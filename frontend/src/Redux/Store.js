import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./Slices/homePageSlice";
import productsReducer from "./Slices/productsSlice";
import productIDReducer from "./Slices/productsIdSlice";
import uiReduces from "./Slices/ui";
import authReducer from "./Slices/authSlice";
import cartReducer from "./Slices/cartSlice";
import wishlistReducer from "./Slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    products: productsReducer,
    id: productIDReducer,
    ui: uiReduces,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
