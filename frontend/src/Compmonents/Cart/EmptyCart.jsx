import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NavLink } from "react-router-dom";

export default function EmptyCart() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
      }}
    >
      <FavoriteBorderIcon
        sx={{
          fontSize: {
            xs: "30px",
            sm: "35px",
            md: "40px",
          },
          mb: 2,
          color: "primary.main",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: "custom.text",
          fontWeight: "bold",
          mb: 2,
          fontSize: {
            xs: "25px",
            sm: "30px",
            md: "34px",
          },
        }}
      >
        Your cart is empty
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "custom.textSecondary",
          mb: 2,
          fontSize: {
            xs: "10px",
            sm: "12px",
            md: "14px",
          },
        }}
      >
        Looks like you haven't added anything to your cart yet.
      </Typography>
      <Box component={NavLink} to={"/products"}>
        <Button
          variant="contained"
          sx={{
            fontSize: {
              xs: "10px",
              sm: "12px",
              md: "14px",
            },
            textTransform: "capitalize",
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}
