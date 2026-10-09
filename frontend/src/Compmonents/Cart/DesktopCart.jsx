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

export default function DesktopCart() {
  const shopCart = useSelector((state) => state.cart.shopCart);
  const allProducts = useSelector((state) => state.homePage.allProducts);

  const dispatch = useDispatch();

  const cartProducts = shopCart.map((cartItem) => {
    const product = allProducts.products?.find(
      (product) => product.id === cartItem.id,
    );

    return {
      ...product,
      quantity: cartItem.quantity,
    };
  }).filter((product) => product?.id);

  // Subtotal value
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

  const showProductCart = cartProducts.map((product) => (
    <Box
      key={product.id}
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 0.75fr 1fr 0.75fr 60px",
        alignItems: "center",
        gap: 2,
        p: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Product */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src={product?.thumbnail}
          alt={product?.title}
          sx={{
            width: 90,
            height: 90,
            objectFit: "contain",
          }}
        />

        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "custom.text",
            }}
          >
            {product?.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              fontSize: "14px",
              color: "text.secondary",
            }}
          >
            {product?.category}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "success.main",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            In Stock
          </Typography>
        </Box>
      </Box>

      {/* Price */}
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        ${product?.price}
      </Typography>

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

      {/* Subtotal */}
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ color: "text.secondary" }}
      >
        ${(product.price * product.quantity).toFixed(2)}
      </Typography>

      {/* Remove */}
      <IconButton
        sx={{ width: "fit-content" }}
        onClick={() => handleClickOpen(product)}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Box>
  ));

  return (
    <Box sx={{ mb: 2 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {/* Breadcrumb */}
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
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              marginTop: "8px",
              color: "custom.text",
              display: "flex",
              alignItems: "center",
              fontSize: {
                xs: "20px",
                sm: "25px",
                md: "32px",
              },
            }}
          >
            Your Cart
            <Typography
              variant="body1"
              sx={{
                marginLeft: "10px",
                fontSize: "20px",
                color: "custom.textSecondary",
              }}
            >
              ({cartProducts.length})
            </Typography>
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
            Review your items and proceed to checkout.
          </Typography>
        </Box>

        {/* Continue Shopping */}
        <Box
          component={NavLink}
          to="/products"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontSize: {
              xs: "14px",
              md: "16px",
            },
            display: "flex",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Continue Shopping</Typography>

          <KeyboardArrowRightOutlinedIcon />
        </Box>
      </Box>

      {/* Cart Content */}
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              mb: 3,
            }}
          >
            {/* Products */}
            <Box
              sx={{
                width: "70%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "10px",
                backgroundColor: "custom.card",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Cart Header */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 0.75fr 1fr 0.75fr 60px",
                  alignItems: "center",
                  gap: 2,
                  pb: 2,
                  p: 3,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  width: "100%",
                  backgroundColor: "custom.cartHeader",
                  color: "custom.navbarText",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Product
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Price
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    marginLeft: "15px",
                  }}
                >
                  Quantity
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Subtotal
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Remove
                </Typography>
              </Box>

              {/* Products */}
              {showProductCart}

              {/* Promo Code */}
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocalOfferOutlinedIcon
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    margin: "0 10px",
                    color: "custom.navbarText",
                  }}
                >
                  Have a promo code?
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Enter code
                </Typography>
              </Box>
            </Box>

            {/* Order Summary */}
            <Box
              sx={{
                width: "30%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "10px",
                backgroundColor: "custom.card",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                p: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "custom.text",
                  fontSize: "20px",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Order Summary
              </Typography>

              <Box
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                {/* Subtotal */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "custom.textSecondary" }}
                  >
                    Subtotal ({cartProducts.length})
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "custom.textSecondary" }}
                  >
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>

                {/* Shipping */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "custom.textSecondary" }}
                  >
                    Shipping
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
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
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "custom.textSecondary" }}
                  >
                    Tax (included)
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "custom.textSecondary" }}
                  >
                    $0.00
                  </Typography>
                </Box>
              </Box>

              {/* Total */}
              <Box
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "custom.text",
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </Typography>

                  <Typography variant="h6" sx={{ color: "custom.text" }}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    component={NavLink}
                    to="/checkout"
                    sx={{
                      width: "80%",
                      textTransform: "capitalize",
                      fontSize: "12px",
                      p: 1.5,
                    }}
                    variant="contained"
                    startIcon={<HttpsIcon fontSize="small" />}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>

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
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>{"Remove item?"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
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
