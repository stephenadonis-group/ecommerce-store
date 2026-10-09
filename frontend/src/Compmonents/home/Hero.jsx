// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useTheme } from "@mui/material/styles";
import iPhone17 from "../../assets/Images/iPhone_17_Pro_Max.png";
import samsungImage from "../../assets/Images/ChatGPT Image Aug 7, 2026, 10_37_29 PM.png";
import sonyImage from "../../assets/Images/59509029-48a7-49d3-8653-a8160a9ebb0b.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  const theme = useTheme();

  const HerosObject = [
    {
      id: 1,
      title: "Apple iPhone 17 Pro Max",
      desc1: "Titanium design. A17 Pro chip",
      desc2: "The ultimate iPhone experience.",
      price: "$1,199.00",
      image: iPhone17,
    },
    {
      id: 2,
      title: "Samsung Galaxy Watch 6",
      desc1: "Advanced health tracking.",
      desc2: "Your everyday companion.",
      price: "$159.00",
      image: samsungImage,
    },
    {
      id: 3,
      title: "Sony WH-1000XM6",
      desc1: "Industry-leading noise cancellation.",
      desc2: "Premium sound. All-day comfort.",
      price: "$449.00",
      image: sonyImage,
    },
  ];

  const allHeros = HerosObject.map((item) => {
    return (
      <SwiperSlide key={item.id}>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            height: "100%",
            padding: {
              xs: "0 15px",
              sm: "0 45px",
            },
            gap: {
              xs: "5px",
              sm: "15px",
            },
          }}
        >
          {/* Text */}
          <Box
            sx={{
              width: {
                xs: "60%",
                sm: "50%",
              },
              padding: "0 25px",

              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "16px",
                  },
                  fontWeight: "bold",
                }}
              >
                New Arrivals
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "custom.text",
                  margin: "10px 0",
                  fontSize: {
                    xs: "18px",
                    sm: "2.125em",
                  },
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  fontSize: {
                    xs: "9px",
                    sm: "14px",
                  },
                  color: "custom.textSecondary",
                  marginBottom: "5px",
                }}
              >
                {item.desc1} {item.desc2}
              </Typography>

              <Typography
                variant="subtitle1"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "13px",
                    sm: "20px",
                  },
                  marginBottom: "15px",
                }}
              >
                {item.price}
              </Typography>

              <NavLink
                to="/products/id"
                style={{ width: "fit-content", display: "block" }}
              >
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<ArrowRightAltIcon />}
                  sx={{
                    width: "fit-content",
                    backgroundColor: "custom.heroButton",
                    color: "custom.heroButtonText",
                    "&:hover": {
                      backgroundColor: "custom.heroButtonHover",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                    borderRadius: "16px",
                    fontSize: {
                      xs: "10px",
                      sm: "14px",
                    },

                    "& .MuiButton-endIcon svg": {
                      fontSize: {
                        xs: "14px",
                        sm: "22px",
                      },
                    },
                  }}
                >
                  Shop Now
                </Button>
              </NavLink>
            </Box>
          </Box>

          {/* Product Image */}
          <Box
            sx={{
              width: {
                xs: "40%",
                sm: "50%",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt=""
              sx={{
                display: "block",
                width: "100%",
                height: "auto",
                maxWidth: {
                  xs: "150px",
                  sm: "250px",
                },
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </SwiperSlide>
    );
  });

  return (
    <>
      <style>
        {`
        .swiper-button-next,
        .swiper-button-prev {
          background: ${theme.palette.custom.swiperButton} !important;
          color: ${theme.palette.custom.swiperButtonColor} !important;
        }
        .swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
      background: ${theme.palette.custom.swiperDotInactive} !important;
      opacity: 1 !important;
      }
      .swiper-pagination-bullet {
      background: #9c27b0 !important;
      opacity: 1 !important;
    }
      `}
      </style>
      <Swiper
        className="hero-swiper"
        style={{
          background: theme.palette.custom.heroBg,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {allHeros}
      </Swiper>
    </>
  );
}
