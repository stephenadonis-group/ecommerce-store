import { useDispatch, useSelector } from "react-redux";
import { fetchProductsById } from "../../Redux/Slices/productsIdSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Rating, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import QuantityBox from "./QuantityBox";
import { toggleWishlist } from "../../Redux/Slices/wishlistSlice";
import { addToCart } from "../../Redux/Slices/cartSlice";
import ProductCard from "./ProductCard";
import { reviewsAPI } from "../../api/endpoints";
import ReviewSection from "../Reviews/ReviewSection";
import Grid from "@mui/material/Grid";
import ProductSkeleton from "./ProductSkeleton";
import MySnackbar from ".././Snackbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductsDetails() {
  const id = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.id.responeId);
  const oldPrice = product?.price / (1 - product?.discountPercentage / 100);
  const allProducts = useSelector((state) => state.homePage.allProducts);
  const status = useSelector((state) => state.id.status);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const recommendedProducts = allProducts?.products
    ?.filter((item) => {
      return item.category === product?.category && item.id !== product?.id;
    })
    .slice(0, 4);

  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const wishlist = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlist.includes(product?.id);

  function handleAddCart() {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
    setOpenSnackbar(true);
  }

  useEffect(() => {
    dispatch(fetchProductsById(id));
  }, [id, dispatch]);

  function refreshReviews() {
    reviewsAPI
      .getByProduct(product?.id ?? id.id)
      .then((data) => setReviews(data))
      .catch(() => setReviews([]));
  }

  useEffect(() => {
    reviewsAPI
      .getByProduct(id.id)
      .then((data) => setReviews(data))
      .catch(() => setReviews([]));
  }, [id]);

  function handleFavoriteButton() {
    dispatch(toggleWishlist(product.id));
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ mb: 2, mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Box
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "custom.textSecondary",
            fontSize: {
              xs: "10px",
              md: "12px",
            },
          }}
        >
          Home
        </Box>

        <KeyboardArrowRightOutlinedIcon
          sx={{
            color: "custom.textSecondary",
            fontSize: {
              xs: "16px",
              md: "20px",
            },
          }}
        />

        <Box
          component={NavLink}
          to="/products"
          sx={{
            textDecoration: "none",
            color: "custom.textSecondary",
            fontSize: {
              xs: "10px",
              md: "12px",
            },
          }}
        >
          Shop
        </Box>

        <KeyboardArrowRightOutlinedIcon
          sx={{
            color: "custom.textSecondary",
            fontSize: {
              xs: "16px",
              md: "20px",
            },
          }}
        />

        <Box
          component={NavLink}
          to={`/products/category/${product.category}`}
          sx={{
            textDecoration: "none",
            color: "custom.textSecondary",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: {
              xs: "10px",
              md: "12px",
            },
          }}
        >
          {product.category}
        </Box>

        <KeyboardArrowRightOutlinedIcon
          sx={{
            color: "custom.textSecondary",
            fontSize: {
              xs: "16px",
              md: "20px",
            },
          }}
        />

        <Box
          component={NavLink}
          to="/products"
          sx={{
            textDecoration: "none",
            color: "custom.textSecondary",
            fontSize: {
              xs: "10px",
              md: "12px",
            },
          }}
        >
          {product.title}
        </Box>
      </Box>

      {/* == Product Details == */}

      <Box
        sx={{
          backgroundColor: "custom.card",
          padding: "30px",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          borderRadius: "10px",
        }}
      >
        {/* == Product Image == */}
        <Box
          sx={{
            backgroundColor: "custom.background",
            width: {
              xs: "100%",
              md: "30%",
            },
            height: {
              xs: 280,
              sm: 350,
              md: 400,
            },
            borderRadius: "10px",
          }}
        >
          <Box
            component="img"
            src={product.images[0]}
            alt={product.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        {/* === Product Image === */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 1, color: "custom.text", fontWeight: "bold" }}
            >
              {product.title}
            </Typography>

            <IconButton onClick={handleFavoriteButton} aria-label="favorite">
              {isWishlisted ? (
                <FavoriteIcon fontSize="small" sx={{ color: "#e53935" }} />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={product.rating}
              precision={0.5}
              readOnly
              sx={{ fontSize: "18px" }}
            />
            <Typography
              variant="caoption"
              sx={{
                fontSize: "10px",
                marginLeft: "10px",
                marginTop: "2px",
                color: "custom.text",
              }}
            >
              {product.rating}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "10px",
                margin: "2px 5px 0",
                paddingRight: "5px",
                borderRight: "1px solid",
                borderColor: "custom.border",
                color: "custom.textSecondary",
              }}
            >
              ({reviews.length} reviews)
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                marginTop: "2px",
                paddingRight: "5px",
                borderRight: "1px solid",
                borderColor: "custom.border",
                color: "custom.textSecondary",
              }}
            >
              Brand: {product.brand || "No Brand"}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                marginLeft: "5px",
                marginTop: "2px",
                color: "custom.textSecondary",
              }}
            >
              Stock: {product.stock}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
                color: "custom.text",
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "0px",
              }}
            >
              ${product.price}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: "#9c27b047",
                padding: "3px 8px",
                marginLeft: "10px",
                marginRight: "10px",
                borderRadius: "6px",
                color: "primary.main",
                fontSize: "12px",
                fontWeight: "bold",
                zIndex: 2,
              }}
            >
              {product.discountPercentage > 0
                ? -Math.round(product.discountPercentage) + "%"
                : ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#9ca3af",
                textDecoration: "line-through",
              }}
            >
              ${oldPrice.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ fontSize: "12px", color: "#6b7280", mb: 1 }}
          >
            {product.description}
          </Typography>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          />

          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "70%",
                md: "50%",
              },
              mt: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: "bold", mb: 1, color: "custom.text" }}
              >
                Category
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: "bold", mb: 1, color: "custom.text" }}
              >
                Brand
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: "bold", mb: 1, color: "custom.text" }}
              >
                Rating
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: "bold", mb: 1, color: "custom.text" }}
              >
                Stock
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: "bold", mb: 1, color: "custom.text" }}
              >
                Warranty
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: "bold", color: "custom.text" }}
              >
                Shipping
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                component="p"
                sx={{
                  textTransform: "capitalize",
                  mb: 1,
                  color: "custom.text",
                }}
              >
                {product.category}
              </Typography>

              <Typography
                variant="caption"
                component="p"
                sx={{
                  textTransform: "capitalize",
                  mb: 1,
                  color: "custom.text",
                }}
              >
                {product.brand || "No Brand"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  color: "custom.text",
                }}
              >
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  sx={{ fontSize: "16px" }}
                />
                <Typography
                  variant="caoption"
                  sx={{
                    fontSize: "10px",
                    marginLeft: "10px",
                    color: "custom.text",
                  }}
                >
                  {product.rating}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "10px",
                    color: "custom.textSecondary",
                    marginLeft: "5px",
                  }}
                >
                  ({reviews.length} reviews)
                </Typography>
              </Box>
              <Typography
                variant="caption"
                component="p"
                sx={{
                  textTransform: "capitalize",
                  mb: 1,
                  color: "custom.text",
                }}
              >
                {product.stock} Items
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{
                  textTransform: "capitalize",
                  mb: 1,
                  color: "custom.text",
                }}
              >
                {product.warrantyInformation}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ textTransform: "capitalize", color: "custom.text" }}
              >
                {product.shippingInformation}
              </Typography>
            </Box>
          </Box>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          />

          {/* Payment */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              mt: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: "10px", sm: "0" },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "custom.text", marginRight: "15px" }}
              >
                Quantity:
              </Typography>
              <QuantityBox setQuantity={setQuantity} quantity={quantity} />
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<LocalGroceryStoreOutlinedIcon fontSize="small" />}
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                  ml: {
                    xs: 0,
                    sm: 3,
                  },
                }}
                onClick={handleAddCart}
              >
                Add to cart
              </Button>

              <MySnackbar
                open={openSnackbar}
                setOpenSnackbar={setOpenSnackbar}
              />
            </Box>
          </Box>
          {/* === Payment === */}
        </Box>
      </Box>

      {/* === Product Details === */}

      {/* Reviews */}
      <ReviewSection
        productId={product.id}
        reviews={reviews}
        onRefresh={refreshReviews}
      />

      {/* Recommended Products */}

      <Box>
        <Typography
          variant="body1"
          sx={{ color: "custom.text", mb: 3, mt: 3, fontWeight: "bold" }}
        >
          You May Also Like
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        {status === "loading"
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                }}
              >
                <ProductSkeleton />
              </Grid>
            ))
          : recommendedProducts?.map((product) => {
              return (
                <Grid
                  key={product.id}
                  size={{
                    xs: 6,
                    md: 4,
                    lg: 3,
                  }}
                >
                  <ProductCard product={product} />
                </Grid>
              );
            })}
      </Grid>

      {/* === Recommended Products === */}
    </Box>
  );
}
