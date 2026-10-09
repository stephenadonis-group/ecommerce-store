import { Box, Typography, Button, Chip, Skeleton, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { ordersAPI } from "../api/endpoints";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const STATUS_COLORS = {
  PENDING: "warning",
  CONFIRMED: "success",
  SHIPPED: "info",
  DELIVERED: "success",
  CANCELLED: "error",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        setStatus("loading");
        const data = await ordersAPI.getAll();
        setOrders(data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load orders");
        setStatus("failed");
      }
    }
    loadOrders();
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "custom.textSecondary",
              fontSize: { xs: "10px", md: "12px" },
            }}
          >
            Home
          </Box>
          <KeyboardArrowRightOutlinedIcon
            sx={{ color: "custom.textSecondary", fontSize: { xs: "16px", md: "20px" } }}
          />
          <Typography sx={{ color: "custom.text", fontSize: { xs: "10px", md: "12px" } }}>
            My Orders
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 1,
            fontSize: { xs: "24px", md: "32px" },
            fontWeight: 700,
            color: "custom.text",
          }}
        >
          My Orders
        </Typography>
        <Typography sx={{ mt: 0.5, fontSize: { xs: "11px", md: "14px" }, color: "text.secondary" }}>
          Track and review your past orders.
        </Typography>
      </Box>

      {status === "loading" &&
        Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              p: 3,
              mb: 2,
            }}
          >
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 1, borderRadius: "8px" }} />
          </Box>
        ))}

      {status === "failed" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {status === "succeeded" && orders.length === 0 && (
        <Box
          sx={{
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "custom.text", mb: 1 }}>
            No orders yet
          </Typography>
          <Typography sx={{ color: "custom.textSecondary", mb: 2 }}>
            When you place an order, it will show up here.
          </Typography>
          <Button
            component={NavLink}
            to="/products"
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            Start Shopping
          </Button>
        </Box>
      )}

      {status === "succeeded" &&
        orders.map((order) => (
          <Box
            key={order.id}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              p: { xs: 2, md: 3 },
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                pb: 2,
                mb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                <Typography sx={{ fontWeight: "bold", color: "custom.text", fontSize: "15px" }}>
                  Order #{order.id}
                </Typography>
                <Typography sx={{ color: "custom.textSecondary", fontSize: "13px" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Chip
                  label={order.status}
                  color={STATUS_COLORS[order.status] || "default"}
                  size="small"
                  sx={{ fontWeight: 600, fontSize: "11px" }}
                />
              </Box>
              <Typography sx={{ fontWeight: "bold", color: "custom.text", fontSize: "15px" }}>
                ${Number(order.totalAmount).toFixed(2)}
              </Typography>
            </Box>

            {order.items.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "8px",
                    backgroundColor: "custom.cartHeader",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={item.thumbnail}
                    alt={item.title}
                    sx={{ width: "90%", height: "90%", objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "custom.text",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "custom.textSecondary", mt: 0.5 }}>
                    Qty: {item.quantity} × ${Number(item.priceAtPurchase).toFixed(2)}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "custom.text" }}>
                  ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Typography sx={{ mt: 1.5, fontSize: "12px", color: "custom.textSecondary" }}>
              {order.shippingAddress}, {order.city} {order.postalCode} ·{" "}
              {order.paymentMethod === "apple" ? "Apple Pay" : "Credit / Debit Card"}
            </Typography>
          </Box>
        ))}
    </Box>
  );
}
