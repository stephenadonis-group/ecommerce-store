import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../../src/assets/Images/logo.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import applePay from "../../assets/payment/Apple_Pay_Mark_RGB_041619.svg";
import visa from "../../assets/payment/visa.jpg";
import masterCard from "../../assets/payment/ma_symbol.svg";
import Tamara from "../../assets/payment/Tamara Logos-01.png";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <Box
      sx={{
        margin: "30px 0 0",
        background: "#0F141C",
        padding: "30px 40px",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          borderBottom: "1px solid #29303A",
        }}
      >
        {/* Start Social Media */}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "25%",
            },
            borderRight: {
              xs: "none",
              sm: "1px solid #29303A",
            },
            borderBottom: {
              xs: "1px solid #29303A",
              sm: "none",
            },
            paddingBottom: {
              xs: "20px",
              sm: "0",
            },
            marginBottom: {
              xs: "20px",
              sm: "0",
            },
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <Box
              component="img"
              src={logo}
              sx={{
                marginRight: "10px",
                width: 30,
                height: 30,
                objectFit: "contain",
              }}
            ></Box>
            <Typography
              variant="h4"
              sx={{
                color: "#F5F5F5",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: {
                  xs: "25px",
                  sm: "14px",
                  md: "22px",
                },
                fontWeight: "bold",
              }}
            >
              Nexora
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "#A8ADB7",
              marginBottom: "20px",
              fontSize: {
                xs: "14px",
                sm: "10px",
                md: "14px",
              },
            }}
          >
            Modern products, <br />
            simple shopping.
          </Typography>
          <ul className="social-media-list">
            <li className="facebook">
              <a href="#">
                <FaFacebookF />
              </a>
            </li>
            <li className="instagram">
              <a href="#">
                <FaInstagram />
              </a>
            </li>
            <li className="gitbub">
              <a href="https://github.com/Yusuf-Mohamed-1" target="_blank">
                <FaGithub />
              </a>
            </li>
            <li className="linkedin">
              <a
                href="https://www.linkedin.com/in/yusuf-mohamed1/"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </Box>
        {/* End Social Media */}
        {/* Start Shop Links */}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "25%",
            },
            borderRight: {
              xs: "none",
              sm: "1px solid #29303A",
            },
            borderBottom: {
              xs: "1px solid #29303A",
              sm: "none",
            },
            paddingBottom: {
              xs: "20px",
              sm: "0",
            },
            marginBottom: {
              xs: "20px",
              sm: "0",
            },
            display: "flex",
            alignItems: {
              xs: "start",
              sm: "center",
            },
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#A970FF",
              fontSize: {
                sm: "10px",
                md: "14px",
              },
              width: "70%",
              textTransform: "uppercase",
            }}
          >
            Shop
          </Typography>
          <ul className="shop-link">
            <li>
              <NavLink to={"/"} className={() => ""}>
                <HomeOutlinedIcon fontSize="small" />
                <Typography variant="body2">Home</Typography>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/products"} className={() => ""}>
                <GridViewOutlinedIcon fontSize="small" />
                <Typography variant="body2">Products</Typography>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/products/category"} className={() => ""}>
                <LocalOfferOutlinedIcon fontSize="small" />
                <Typography variant="body2">Categories</Typography>
              </NavLink>
            </li>
          </ul>
        </Box>
        {/* End Shop Links */}
        {/* Start Quick Links */}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "25%",
            },
            borderRight: {
              xs: "none",
              sm: "1px solid #29303A",
            },
            borderBottom: {
              xs: "1px solid #29303A",
              sm: "none",
            },
            marginBottom: {
              xs: "20px",
              sm: "0",
            },
            display: "flex",
            alignItems: {
              xs: "start",
              sm: "center",
            },
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#A970FF",
              fontSize: {
                sm: "10px",
                md: "14px",
              },
              width: "70%",
              textTransform: "uppercase",
            }}
          >
            Quick Links
          </Typography>
          <ul className="shop-link">
            <li>
              <NavLink to={"/cart"} className={() => ""}>
                <AddShoppingCartOutlinedIcon fontSize="small" />
                <Typography variant="body2">Cart</Typography>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/wishlist"} className={() => ""}>
                <FavoriteBorderOutlinedIcon fontSize="small" />
                <Typography variant="body2">Wishlist</Typography>
              </NavLink>
            </li>
          </ul>
        </Box>
        {/* End Quick Links */}
        {/* Start Customer Service */}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "25%",
            },
            display: "flex",
            alignItems: {
              xs: "start",
              sm: "center",
            },
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#A970FF",
              fontSize: {
                sm: "10px",
                md: "14px",
              },
              width: "70%",
              textTransform: "uppercase",
            }}
          >
            Customer Service
          </Typography>
          <ul className="shop-link">
            <li>
              <NavLink to={"/"} className={() => ""}>
                <SupportAgentOutlinedIcon fontSize="small" />
                <Typography variant="body2">Contact Us</Typography>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} className={() => ""}>
                <HelpOutlineOutlinedIcon fontSize="small" />
                <Typography variant="body2">FAQ</Typography>
              </NavLink>
            </li>
          </ul>
        </Box>
        {/* End Customer Service */}
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#a8adb7",
            marginBottom: {
              xs: "15px",
              sm: "0px",
            },
          }}
        >
          <CopyrightOutlinedIcon fontSize="small" />
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", marginLeft: "5px" }}
          >
            2026 Shopora. All rights reserved.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img style={{ width: "35px" }} src={applePay} alt="Apple_Pay" />
          <img
            style={{ width: "35px", margin: "0 10px " }}
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
    </Box>
  );
}
