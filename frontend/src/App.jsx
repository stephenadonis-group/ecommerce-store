import Home from "./Pages/Home";
import Header from "./Compmonents/Headers/Header";
import Container from "@mui/material/Container";
import Footer from "./Compmonents/home/Footer";
import ProductsPage from "./Pages/ProductsPage";
import ProductsDetails from "./Compmonents/Products/ProductsDetails";
import Cart from "./Pages/Cart";
import { fetchHomeData } from "./Redux/Slices/homePageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ScrollToTop from "./ScrollToTop";
import Wishlist from "./Pages/Wishlist";
import CategoriesPage from "./Pages/CategoriesPage";
import Checkout from "./Pages/CheckOut";
import OrderSuccess from "./Pages/OrderSuccess";
import Orders from "./Pages/Orders";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { fetchCurrentUser } from "./Redux/Slices/authSlice";
import { mergeGuestCart, fetchCart } from "./Redux/Slices/cartSlice";
import { fetchWishlist, mergeWishlist } from "./Redux/Slices/wishlistSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchHomeData());
    if (localStorage.getItem("novastore_token")) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(mergeGuestCart());
      dispatch(mergeWishlist());
    } else {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [token, dispatch]);

  return (
    <Box sx={{ backgroundColor: "custom.background" }}>
      <Container maxWidth={"xl"}>
        <Header />

        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/category/:category"
            element={<ProductsPage />}
          />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/products/category" element={<CategoriesPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Container>
    </Box>
  );
}

export default App;
