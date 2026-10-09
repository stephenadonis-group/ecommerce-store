import { Box, Button, Typography, Grid } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ProductCard from "../Products/ProductCard";
import ProductSkeleton from "../Products/ProductSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { clearWishlist } from "../../Redux/Slices/wishlistSlice";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ProductsWishlist({ wishlistProducts }) {
  const [openClear, setOpenClear] = useState(false);

  const status = useSelector((state) => state.homePage.status);
  const dispatch = useDispatch();

  function handleClickOpen() {
    setOpenClear(true);
  }

  const handleClose = () => {
    setOpenClear(false);
  };

  function handleDeleteCart() {
    setOpenClear(false);

    dispatch(clearWishlist());
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
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
            {wishlistProducts?.length} Items
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
            onClick={handleClickOpen}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
              Clear All
            </Typography>
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        {status === "loading"
          ? Array.from({ length: wishlistProducts?.length }).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <ProductSkeleton />
              </Grid>
            ))
          : wishlistProducts?.map((product) => {
              return (
                <Grid
                  key={product.id}
                  size={{
                    xs: 6,
                    md: 4,
                    lg: 3,
                  }}
                >
                  <ProductCard product={product} />
                </Grid>
              );
            })}
      </Grid>

      {/* Dialog */}
      <Dialog
        open={openClear}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>{"Clear item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to clear all items?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{ textTransform: "capitalize", color: "custom.text" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCart}
            color="error"
            sx={{ textTransform: "capitalize" }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
