import { Box, Typography, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { NavLink } from "react-router-dom";

import elecronicsImage from "../../assets/Images/Electronics_background.png";
import furnitureImage from "../../assets/Images/furniture_background.png";

export default function PromotionalBanners() {
  const banners = [
    {
      category: "Electronics",
      categoryColor: "#94A3B8",
      title: "Premium Tech",
      titleColor: "#FFFFFF",
      description: "Explore the latest technology",
      descriptionColor: "#CBD5E1",
      button: "Shop Electronics",
      link: "/products/category/electronics",
      image: elecronicsImage,
    },
    {
      category: "Home & Living",
      categoryColor: "#78716C",
      title: "Make Your Space Better",
      titleColor: "#111827",
      description: "Discover modern furniture and decor",
      descriptionColor: "#4B5563",
      button: "Shop Now",
      link: "/products/category/furniture",
      image: furnitureImage,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        margin: "30px 0",
        gap: "20px",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      {banners.map((banner) => (
        <Box
          key={banner.title}
          sx={{
            width: {
              xs: "100%",
              sm: "50%",
            },
            height: { xs: 180, md: 220 },
            backgroundImage: `url("${banner.image}")`,
            padding: "30px 20px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "fit-content",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "8px",
                  md: "10px",
                  lg: "12px",
                },
                fontWeight: "bold",
                color: banner.categoryColor,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: "10px",
              }}
            >
              {banner.category}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: banner.titleColor,
                fontSize: {
                  xs: "24px",
                  sm: "18px",
                  md: "20px",
                  lg: "24px",
                },
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {banner.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: banner.descriptionColor,
                fontSize: {
                  xs: "10px",
                  sm: "8px",
                  md: "10px",
                },
                fontWeight: "bold",
                marginBottom: {
                  xs: "15px",
                  sm: "10px",
                  lg: "15px",
                },
              }}
            >
              {banner.description}
            </Typography>
            <NavLink to={banner.link}>
              <Button
                variant="contained"
                size="small"
                endIcon={<ArrowRightAltIcon />}
                sx={{
                  width: "fit-content",
                  backgroundColor: "#111827",
                  color: "#FFFFFF",
                  display: "flex",
                  justifyContent: "space-between",
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  fontSize: {
                    xs: "10px",
                    sm: "8px",
                    md: "10px",
                  },

                  "& .MuiButton-endIcon svg": {
                    fontSize: {
                      xs: "14px",
                      sm: "22px",
                    },
                  },
                }}
              >
                {banner.button}
              </Button>
            </NavLink>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
