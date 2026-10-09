import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import ProductCard from "../Products/ProductCard";
import ProductSkeleton from "../Products/ProductSkeleton";

export default function FeaturedProducts() {
  const featuredProducts = useSelector(
    (state) => state.homePage.featuredProducts,
  );

  const status = useSelector((state) => state.homePage.status);

  return (
    <Box sx={{ margin: "30px 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "custom.text",
            fontSize: {
              xs: "16px",
              sm: "20px",
            },
          }}
        >
          Featured Products
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "custom.textSecondary",
            fontSize: {
              xs: "12px",
              sm: "14px",
            },
            fontWeight: "500",
          }}
          component={NavLink}
          to="/products"
        >
          View all products
          <ArrowRightAltIcon sx={{ marginLeft: "5px" }} />
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {status === "loading"
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 2,
                }}
              >
                <ProductSkeleton />
              </Grid>
            ))
          : featuredProducts.map((product) => (
              <Grid
                key={product.id}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 2,
                }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
