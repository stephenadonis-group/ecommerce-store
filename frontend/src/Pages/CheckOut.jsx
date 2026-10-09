import {
  Alert,
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearCart } from "../Redux/Slices/cartSlice";
import { ordersAPI } from "../api/endpoints";

export default function Checkout() {
  const shopCart = useSelector((state) => state.cart.shopCart);
  const allProducts = useSelector((state) => state.homePage.allProducts);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Cart Products
  const cartProducts = shopCart
    .map((cartItem) => {
      const product = allProducts.products?.find(
        (product) => product.id === cartItem.id,
      );

      return {
        ...product,
        quantity: cartItem.quantity,
      };
    })
    .filter((product) => product?.id);

  // Prices
  const subtotal = cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const shipping = subtotal >= 100 ? 0 : 5;

  const total = subtotal + shipping;

  // Form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
  });

  const [errors, setErrors] = useState({});
  const [orderError, setOrderError] = useState(null);
  const [placing, setPlacing] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  // Validation
  function validateForm() {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handlePlaceOrder() {
    if (!validateForm()) {
      return;
    }

    setPlacing(true);
    setOrderError(null);

    try {
      const order = await ordersAPI.place({
        shippingAddress: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
      });

      dispatch(clearCart());

      navigate("/order-success", {
        state: {
          total: order.totalAmount,
          orderId: order.id,
        },
      });
    } catch (err) {
      setOrderError(err.response?.data?.error || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  // Login guard — must run before any early return so hook order stays stable
  useEffect(() => {
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent("/checkout")}`, { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null;

  // Empty Cart
  if (cartProducts.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "custom.text",
            mb: 1,
          }}
        >
          Your cart is empty
        </Typography>

        <Typography
          sx={{
            color: "custom.textSecondary",
            mb: 2,
          }}
        >
          Add some products before proceeding to checkout.
        </Typography>

        <Button
          component={NavLink}
          to="/products"
          variant="contained"
          sx={{
            textTransform: "capitalize",
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        {/* Breadcrumb */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
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

          <Box
            component={NavLink}
            to="/cart"
            sx={{
              textDecoration: "none",
              color: "custom.textSecondary",
              fontSize: {
                xs: "10px",
                md: "12px",
              },
            }}
          >
            Cart
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
              color: "custom.text",
              fontSize: {
                xs: "10px",
                md: "12px",
              },
            }}
          >
            Checkout
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          sx={{
            mt: 1,
            fontSize: {
              xs: "24px",
              md: "32px",
            },
            fontWeight: 700,
            color: "custom.text",
          }}
        >
          Checkout
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: {
              xs: "11px",
              md: "14px",
            },
            color: "text.secondary",
          }}
        >
          Complete your information to place your order.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1.7fr 1fr",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* Left Side */}
        <Box>
          {/* Contact Information */}
          <Box
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2.5,
              }}
            >
              <LocalShippingOutlinedIcon sx={{ color: "primary.main" }} />

              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "custom.text",
                }}
              >
                Contact & Shipping
              </Typography>
            </Box>

            {/* First + Last Name */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                size="small"
              />

              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                size="small"
              />
            </Box>

            {/* Email + Phone */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                size="small"
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                size="small"
              />
            </Box>

            {/* Address */}
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={Boolean(errors.address)}
              helperText={errors.address}
              size="small"
              sx={{ mb: 2 }}
            />

            {/* City + Postal */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={Boolean(errors.city)}
                helperText={errors.city}
                size="small"
              />

              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                error={Boolean(errors.postalCode)}
                helperText={errors.postalCode}
                size="small"
              />
            </Box>
          </Box>

          {/* Payment Method */}
          <Box
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <CreditCardOutlinedIcon sx={{ color: "primary.main" }} />

              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "custom.text",
                }}
              >
                Payment Method
              </Typography>
            </Box>

            <FormControl fullWidth>
              <FormLabel
                sx={{
                  color: "custom.textSecondary",
                  fontSize: "13px",
                  mb: 1,
                }}
              >
                Choose your payment method
              </FormLabel>

              <RadioGroup
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid",
                      borderColor:
                        formData.paymentMethod === "card"
                          ? "primary.main"
                          : "divider",
                      borderRadius: "10px",
                    }}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <CreditCardOutlinedIcon
                            fontSize="small"
                            sx={{ color: "custom.navbarIcon" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "custom.textSecondary",
                            }}
                          >
                            Credit / Debit Card
                          </Typography>
                        </Box>
                      }
                      sx={{
                        width: "100%",
                        m: 0,
                        p: 1,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      border: "1px solid",
                      borderColor:
                        formData.paymentMethod === "apple"
                          ? "primary.main"
                          : "divider",
                      borderRadius: "10px",
                    }}
                  >
                    <FormControlLabel
                      value="apple"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <AccountBalanceWalletOutlinedIcon
                            fontSize="small"
                            sx={{ color: "custom.navbarIcon" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "custom.textSecondary",
                            }}
                          >
                            Apple Pay
                          </Typography>
                        </Box>
                      }
                      sx={{
                        width: "100%",
                        m: 0,
                        p: 1,
                      }}
                    />
                  </Box>
                </Box>
              </RadioGroup>
            </FormControl>

            <Typography
              sx={{
                mt: 2,
                fontSize: "11px",
                color: "text.secondary",
              }}
            >
              This is a demo checkout. No real payment will be processed.
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Order Summary */}
        <Box
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            backgroundColor: "custom.card",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            position: {
              md: "sticky",
            },
            top: {
              md: 20,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "custom.text",
              mb: 2,
            }}
          >
            Order Summary
          </Typography>

          {/* Products */}
          <Box
            sx={{
              maxHeight: 280,
              overflowY: "auto",
              mb: 2,
            }}
          >
            {cartProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
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
                    src={product.thumbnail}
                    alt={product.title}
                    sx={{
                      width: "90%",
                      height: "90%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "custom.text",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "custom.textSecondary",
                      mt: 0.5,
                    }}
                  >
                    Qty: {product.quantity}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "custom.text",
                  }}
                >
                  ${(product.price * product.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Prices */}
          <Box
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "custom.textSecondary",
                }}
              >
                Subtotal ({cartProducts.length} items)
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "custom.textSecondary",
                }}
              >
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "custom.textSecondary",
                }}
              >
                Shipping
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "success.main",
                  fontWeight: 600,
                }}
              >
                {shipping === 0 ? "Free" : `$${shipping}`}
              </Typography>
            </Box>

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
                Tax (included)
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "custom.textSecondary",
                }}
              >
                $0.00
              </Typography>
            </Box>
          </Box>

          {/* Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "custom.text",
              }}
            >
              Total
            </Typography>

            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "custom.text",
              }}
            >
              ${total.toFixed(2)}
            </Typography>
          </Box>

          {/* Place Order */}
          {orderError && (
            <Alert severity="error" sx={{ mb: 1.5, fontSize: "12px" }}>
              {orderError}
            </Alert>
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={handlePlaceOrder}
            disabled={placing}
            startIcon={<LockOutlinedIcon fontSize="small" />}
            sx={{
              textTransform: "capitalize",
              fontSize: "13px",
              py: 1.4,
            }}
          >
            {placing ? "Placing Order..." : "Place Order"}
          </Button>

          <Typography
            sx={{
              mt: 1.5,
              textAlign: "center",
              fontSize: "10px",
              color: "text.secondary",
            }}
          >
            Secure checkout · Your information is protected
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
