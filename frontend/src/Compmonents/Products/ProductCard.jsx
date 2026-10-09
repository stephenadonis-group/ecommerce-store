import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../Redux/Slices/wishlistSlice";
import { addToCart } from "../../Redux/Slices/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard({ product }) {
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.includes(product.id);
  const oldPrice = product.price / (1 - product.discountPercentage / 100);
  const displatch = useDispatch();

  function handleFavoriteButton(e) {
    e.preventDefault();
    e.stopPropagation();
    displatch(toggleWishlist(product.id));
  }
  function handleCartButton(e) {
    e.preventDefault();
    e.stopPropagation();
    displatch(addToCart({ product, quantity: 1 }));
  }

  return (
    <Box component={NavLink} to={`/products/${product.id}`}>
      <Card
        sx={{
          backgroundColor: "custom.card",
          border: "1px solid",
          borderColor: "custom.border",
        }}
      >
        <CardContent
          sx={{
            padding: "5px",
            "&:last-child": {
              pb: "10px",
            },
          }}
        >
          <Box sx={{ padding: "5px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: "#ef4444",
                  px: 1.2,
                  py: 0,
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 2,
                }}
              >
                {product.discountPercentage > 0
                  ? -Math.round(product.discountPercentage) + "%"
                  : ""}
              </Typography>
              <IconButton onClick={handleFavoriteButton} aria-label="favorite">
                {isWishlisted ? (
                  <FavoriteIcon fontSize="small" sx={{ color: "#e53935" }} />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Box>

            <Box
              component="img"
              src={product.images[0]}
              sx={{ width: "100%", height: 100, objectFit: "contain" }}
            />
          </Box>

          <Box sx={{ padding: "5px" }}>
            <Typography
              variant="body2"
              sx={{
                margin: "5px 0 ",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {product.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography
                variant="caption"
                sx={{ color: "custom.textSecondary" }}
              >
                {product.rating}
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1.5,
                  mb: 1.5,
                }}
              >
                <Typography sx={{ fontSize: "14px", marginRight: "7px" }}>
                  ${product.price}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "#9ca3af",
                    textDecoration: "line-through",
                  }}
                >
                  ${oldPrice.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
                onClick={handleCartButton}
                sx={{ width: "100%", textTransform: "capitalize" }}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
