import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function HeaderProducts() {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
          marginTop: "8px",
          color: "custom.text",
          fontSize: {
            xs: "20px",
            sm: "25px",
            md: "32px",
          },
        }}
      >
        All Products
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontSize: {
            xs: "10px",
            sm: "12px",
            md: "14px",
          },
          mb: 2,
        }}
      >
        Browse our latest products and find what you love.
      </Typography>
    </Box>
  );
}
