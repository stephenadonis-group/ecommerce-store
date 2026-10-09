import { Box, Typography, Button, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useSelector, useDispatch } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import QuantityBox from "../Products/QuantityBox";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { updateQuantity, removeFromCart } from "../../Redux/Slices/cartSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import CartFeatures from "./CartFeatures";
import EmptyCart from "./EmptyCart";

import applePay from "../../assets/payment/Apple_Pay_Mark_RGB_041619.svg";
import visa from "../../assets/payment/visa.jpg";
import masterCard from "../../assets/payment/ma_symbol.svg";
import Tamara from "../../assets/payment/Tamara Logos-01.png";

export default function MobileCart() {
  const shopCart = useSelector((state) => state.cart.shopCart);
  const allProducts = useSelector((state) => state.homePage.allProducts);

  const dispatch = useDispatch();

  // Cart Products
  const cartProducts = shopCart.map((cartItem) => {
    const product = allProducts.products?.find(
      (product) => product.id === cartItem.id,
    );

    return {
      ...product,
      quantity: cartItem.quantity,
    };
  }).filter((product) => product?.id);

  // Subtotal
  const subtotal = cartProducts.reduce((total, product) => {
    return total + product?.price * product?.quantity;
  }, 0);

  // Shipping
  function shippingPrice() {
    if (subtotal >= 100) {
      return 0;
    } else {
      return 5;
    }
  }

  // Total
  const totalPrice = subtotal + shippingPrice();

  // Delete Cart
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleClickOpen(product) {
    setOpenDelete(true);
    setSelectedProduct(product);
  }

  const handleClose = () => {
    setOpenDelete(false);
  };

  function handleDeleteCart() {
    setOpenDelete(false);

    dispatch(removeFromCart(selectedProduct.id));
  }

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        {/* Breadcrumb */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mb: 1,
          }}
        >
          <Box
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "custom.textSecondary",
              fontSize: "10px",
            }}
          >
            Home
          </Box>

          <KeyboardArrowRightOutlinedIcon
            sx={{
              color: "custom.textSecondary",
              fontSize: "16px",
            }}
          />

          <Box
            component={NavLink}
            to="/cart"
            sx={{
              textDecoration: "none",
              color: "custom.textSecondary",
              fontSize: "10px",
            }}
          >
            Cart
          </Box>
        </Box>

        {/* Title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "custom.text",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Your Cart
              <Typography
                component="span"
                sx={{
                  fontSize: "16px",
                  color: "custom.textSecondary",
                }}
              >
                ({cartProducts.length})
              </Typography>
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "11px",
                mt: 0.5,
              }}
            >
              Review your items and proceed to checkout.
            </Typography>
          </Box>

          {/* Continue Shopping */}
          <Box
            component={NavLink}
            to="/products"
            sx={{
              mt: 2,
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              textDecoration: "none",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Continue Shopping
            </Typography>

            <KeyboardArrowRightOutlinedIcon sx={{ fontSize: "18px" }} />
          </Box>
        </Box>
      </Box>

      {/* Cart Content */}
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Products */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {cartProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  backgroundColor: "custom.card",
                  p: 1.5,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Product Top */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      width: 105,
                      height: 105,
                      flexShrink: 0,
                      borderRadius: "10px",
                      backgroundColor: "custom.cartHeader",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={product?.thumbnail}
                      alt={product?.title}
                      sx={{
                        width: "90%",
                        height: "90%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Product Info */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "custom.text",
                        lineHeight: 1.4,
                        pr: 3,
                      }}
                    >
                      {product?.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: "11px",
                        color: "text.secondary",
                      }}
                    >
                      {product?.category}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.7,
                        fontSize: "11px",
                        color: "success.main",
                        fontWeight: "bold",
                      }}
                    >
                      In Stock
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "custom.text",
                      }}
                    >
                      ${product?.price}
                    </Typography>
                  </Box>

                  {/* Delete */}
                  <IconButton
                    onClick={() => handleClickOpen(product)}
                    sx={{
                      p: 0.5,
                      color: "custom.textSecondary",
                    }}
                  >
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: 21 }} />
                  </IconButton>
                </Box>

                {/* Bottom */}
                <Box
                  sx={{
                    mt: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Quantity */}
                  <QuantityBox
                    quantity={product?.quantity}
                    setQuantity={(newQuantity) => {
                      dispatch(
                        updateQuantity({
                          id: product.id,
                          quantity: newQuantity,
                        }),
                      );
                    }}
                  />

                  {/* Product Subtotal */}
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "custom.text",
                    }}
                  >
                    ${(product.price * product.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Promo Code */}
          <Box
            sx={{
              mt: 1.5,
              p: 1.7,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocalOfferOutlinedIcon
                sx={{
                  color: "primary.main",
                  fontSize: 21,
                }}
              />

              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "custom.text",
                }}
              >
                Have a promo code?
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.main",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Enter code
              </Typography>
            </Box>
          </Box>

          {/* Order Summary */}
          <Box
            sx={{
              mt: 1.5,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
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

            {/* Subtotal */}
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

            {/* Shipping */}
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
                {shippingPrice() === 0 ? "Free" : `$${shippingPrice()}`}
              </Typography>
            </Box>

            {/* Tax */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pb: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
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

            {/* Total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1.5,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  color: "custom.text",
                }}
              >
                Total
              </Typography>

              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "custom.text",
                }}
              >
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            {/* Checkout */}
            <Button
              component={NavLink}
              to="/checkout"
              fullWidth
              variant="contained"
              startIcon={<HttpsIcon fontSize="small" />}
              sx={{
                textTransform: "capitalize",
                fontSize: "13px",
                py: 1.3,
              }}
            >
              Proceed to Checkout
            </Button>

            {/* Features */}
            <Box sx={{ mt: 2 }}>
              <CartFeatures />
            </Box>
          </Box>

          {/* Payment */}
          <Box
            sx={{
              mt: 1.5,
              p: 1.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              backgroundColor: "custom.card",
              display: "flex",
              alignItems: "center",
              gap: 1,
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                color: "custom.textSecondary",
                whiteSpace: "nowrap",
                mr: 2,
              }}
            >
              We Accept
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img style={{ width: "35px" }} src={applePay} alt="applePay" />

              <img
                style={{
                  width: "35px",
                  margin: "0 10px",
                }}
                src={visa}
                alt="visa"
              />

              <img
                style={{
                  width: "30px",
                  marginRight: "10px",
                  backgroundColor: "white",
                }}
                src={masterCard}
                alt="masterCard"
              />

              <img style={{ width: "60px" }} src={Tamara} alt="Tamara" />
            </Box>
          </Box>
        </>
      )}

      {/* Delete Dialog */}
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle>Remove item?</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{
              textTransform: "capitalize",
              color: "custom.text",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteCart}
            color="error"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
