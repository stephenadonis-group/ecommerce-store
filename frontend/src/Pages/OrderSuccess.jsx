import { Box, Typography, Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function OrderSuccess() {
  const location = useLocation();

  const orderTotal = location.state?.total || 0;

  const orderNumber = location.state?.orderId
    ? `#${location.state.orderId}`
    : "#-";

  return (
    <Box
      sx={{
        minHeight: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "550px",
          textAlign: "center",
          p: {
            xs: 3,
            md: 5,
          },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "16px",
          backgroundColor: "custom.card",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Success Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <CheckCircleOutlineOutlinedIcon
            sx={{
              fontSize: {
                xs: 65,
                md: 80,
              },
              color: "success.main",
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: {
              xs: "24px",
              md: "30px",
            },
            fontWeight: 700,
            color: "custom.text",
            mb: 1,
          }}
        >
          Order Placed Successfully!
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: {
              xs: "12px",
              md: "14px",
            },
            color: "custom.textSecondary",
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          Thank you for your purchase. Your order has been received and is being
          prepared.
        </Typography>

        {/* Order Info */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: "10px",
            backgroundColor: "custom.cartHeader",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "custom.textSecondary",
              }}
            >
              Order Number
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "custom.text",
              }}
            >
              {orderNumber}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "custom.textSecondary",
              }}
            >
              Total
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "custom.text",
              }}
            >
              ${Number(orderTotal).toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Button
            component={NavLink}
            to="/orders"
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              fontSize: "13px",
              py: 1.2,
              px: 2.5,
            }}
          >
            View My Orders
          </Button>

          <Button
            component={NavLink}
            to="/products"
            variant="contained"
            startIcon={<ShoppingBagOutlinedIcon />}
            sx={{
              textTransform: "capitalize",
              fontSize: "13px",
              py: 1.2,
              px: 2.5,
            }}
          >
            Continue Shopping
          </Button>

          <Button
            component={NavLink}
            to="/"
            variant="outlined"
            endIcon={<KeyboardArrowRightOutlinedIcon />}
            sx={{
              textTransform: "capitalize",
              fontSize: "13px",
              py: 1.2,
              px: 2.5,
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
