import { Box, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useSelector } from "react-redux";
import { Category } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";

export default function Categories() {
  const showCategories = useSelector((state) => state.homePage.showCategories);
  const status = useSelector((state) => state.homePage.status);

  const categories = showCategories.map((category) => (
    <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }} key={category.slug}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          className={"categories-box"}
          component={NavLink}
          to={`/products/category/${category.slug}`}
        >
          <Box
            sx={{
              backgroundColor: "custom.card",
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={category.image}
              alt={Category.slug}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
              }}
            />
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: "14px", color: "custom.navbarText" }}
          >
            {category.name}
          </Typography>
        </Box>
      </Box>
    </Grid>
  ));

  return (
    <>
      <Box sx={{ margin: "20px 0" }}>
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
            Shop By Categories
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
            to="/products/category"
          >
            View all categories
            <ArrowRightAltIcon sx={{ marginLeft: "5px" }} />
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {status === "loading"
            ? Array.from({ length: 8 }).map((_, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 6,
                    sm: 4,
                    md: 3,
                    lg: 1.5,
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Skeleton variant="rounded" width={100} height={100} />
                </Grid>
              ))
            : categories}
        </Grid>
      </Box>
    </>
  );
}
