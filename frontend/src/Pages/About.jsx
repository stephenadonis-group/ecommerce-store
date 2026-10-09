import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

export default function About() {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 4,
      }}
    >
      {/* Breadcrumb */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 2,
        }}
      >
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

        <Typography
          sx={{
            color: "custom.textSecondary",
            fontSize: {
              xs: "10px",
              md: "12px",
            },
          }}
        >
          About
        </Typography>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "16px",
          backgroundColor: "custom.card",
          boxShadow: "0 3px 12px rgba(0, 0, 0, 0.06)",
          p: {
            xs: 3,
            sm: 4,
            md: 6,
          },
          textAlign: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: {
              xs: 55,
              md: 70,
            },
            height: {
              xs: 55,
              md: 70,
            },
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShoppingBagOutlinedIcon
            sx={{
              color: "white",
              fontSize: {
                xs: 28,
                md: 36,
              },
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: {
              xs: "25px",
              sm: "30px",
              md: "38px",
            },
            fontWeight: 700,
            color: "custom.text",
            mb: 1.5,
          }}
        >
          About Our Store
        </Typography>

        <Typography
          sx={{
            maxWidth: "650px",
            mx: "auto",
            fontSize: {
              xs: "12px",
              md: "14px",
            },
            lineHeight: 1.8,
            color: "custom.textSecondary",
          }}
        >
          We believe shopping online should be simple, convenient, and
          enjoyable. Our store brings together a clean shopping experience with
          useful features that help you find and manage your favorite products
          with ease.
        </Typography>

        <Button
          component={NavLink}
          to="/products"
          variant="contained"
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          sx={{
            mt: 3,
            textTransform: "capitalize",
            fontSize: "13px",
            px: 3,
            py: 1.2,
          }}
        >
          Start Shopping
        </Button>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: {
              xs: "21px",
              md: "26px",
            },
            fontWeight: 700,
            color: "custom.text",
            mb: 2,
          }}
        >
          Why Shop With Us?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {/* Feature 1 */}
          <Box
            sx={{
              p: 2.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              textAlign: "center",
            }}
          >
            <FavoriteBorderOutlinedIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                mb: 1,
              }}
            />

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "custom.text",
                mb: 0.8,
              }}
            >
              Wishlist
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: 1.7,
                color: "custom.textSecondary",
              }}
            >
              Save products you love and easily find them later.
            </Typography>
          </Box>

          {/* Feature 2 */}
          <Box
            sx={{
              p: 2.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              textAlign: "center",
            }}
          >
            <LocalShippingOutlinedIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                mb: 1,
              }}
            />

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "custom.text",
                mb: 0.8,
              }}
            >
              Easy Shopping
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: 1.7,
                color: "custom.textSecondary",
              }}
            >
              Browse products, manage your cart, and checkout with ease.
            </Typography>
          </Box>

          {/* Feature 3 */}
          <Box
            sx={{
              p: 2.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              textAlign: "center",
            }}
          >
            <SecurityOutlinedIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                mb: 1,
              }}
            />

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "custom.text",
                mb: 0.8,
              }}
            >
              Simple Checkout
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: 1.7,
                color: "custom.textSecondary",
              }}
            >
              A simple and straightforward checkout experience.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          p: {
            xs: 2.5,
            md: 3,
          },
          borderRadius: "12px",
          backgroundColor: "custom.cartHeader",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "16px",
                md: "19px",
              },
              fontWeight: "bold",
              color: "custom.navbarText",
              mb: 0.5,
            }}
          >
            Ready to find something you love?
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "custom.textSecondary",
            }}
          >
            Explore our products and start shopping today.
          </Typography>
        </Box>

        <Button
          component={NavLink}
          to="/products"
          variant="contained"
          startIcon={<ShoppingBagOutlinedIcon />}
          sx={{
            flexShrink: 0,
            textTransform: "capitalize",
            fontSize: "12px",
            px: 2.5,
            py: 1.1,
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
}
