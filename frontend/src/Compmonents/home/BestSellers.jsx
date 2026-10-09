import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../Products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useSelector } from "react-redux";
import ProductSkeleton from "../Products/ProductSkeleton";

import "swiper/css/navigation";

export default function BestSellers() {
  const status = useSelector((state) => state.homePage.status);

  const bestSellerProducts = useSelector(
    (state) => state.homePage.bestSellerProducts,
  );
  return (
    <Box sx={{ margin: "30px 0 20px" }}>
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
          Best Sellers
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
          to="/products"
        >
          View all
          <ArrowRightAltIcon sx={{ marginLeft: "5px" }} />
        </Typography>
      </Box>
      <Swiper
        className="best-sellers-swiper"
        modules={[Autoplay, Navigation]}
        navigation
        slidesPerView={6}
        spaceBetween={16}
        loop={bestSellerProducts.length > 6}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          320: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {status === "loading" ? (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 2,
                }}
              >
                <ProductSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          bestSellerProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Box>
  );
}
