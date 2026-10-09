import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import {
  Box,
  InputBase,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../Redux/Slices/ui";
import { logout } from "../../Redux/Slices/authSlice";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import logo from "../../../src/assets/Images/logo.png";
import { setFilters } from "../../Redux/Slices/productsSlice";
import { useNavigate } from "react-router-dom";

export default function DesktopHeader({ search, setSearch }) {
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const filters = useSelector((state) => state.products.filters);
  const navigate = useNavigate();

  const shopCart = useSelector((state) => state.cart.shopCart);
  const cartCount = shopCart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const themeMode = useSelector((state) => state.ui.mode);
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery("(min-width:900px)");

  function handleThemeMode() {
    dispatch(toggleMode());
  }

  function handleSearch() {
    if (search !== "") {
      dispatch(setFilters({ ...filters, search: search.trim() }));
      navigate("/products");
      setSearch("");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src={logo}
          sx={{
            width: {
              md: 30,
              lg: 40,
            },
            height: {
              md: 30,
              lg: 40,
            },
            objectFit: "contain",
          }}
        ></Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: { md: "18px", lg: "25px" },
            color: "custom.text",
          }}
        >
          NEXORA
        </Typography>
      </Box>
      {isDesktop && <NavBar />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "custom.search",
          borderRadius: "14px",
          overflow: "hidden",
          width: {
            md: 350,
            lg: 400,
          },
        }}
      >
        <InputBase
          placeholder="Search for products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          sx={{
            flex: 1,
            height: 35,
            px: 2,
            fontSize: "14px",
            border: "1px solid",
            borderColor: "custom.border",
          }}
        />

        <IconButton
          onClick={handleSearch}
          sx={{
            color: "white",
            height: 35,
            bgcolor: "primary.main",
            borderRadius: 0,
            px: 1,
            "&:hover": {
              bgcolor: "#8e24aa",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {!user ? (
          <Button
            component={NavLink}
            to="/login"
            sx={{
              textTransform: "none",
              fontSize: "13px",
              color: "custom.navbarIcon",
              minWidth: "auto",
              padding: "4px 8px",
            }}
          >
            Sign In
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "13px", fontWeight: 600, color: "custom.text" }}
            >
              {user.firstName}
            </Typography>
            <Button
              component={NavLink}
              to="/orders"
              sx={{
                textTransform: "none",
                fontSize: "13px",
                color: "custom.navbarIcon",
                minWidth: "auto",
                padding: "4px 8px",
                marginLeft: "6px",
              }}
            >
              Orders
            </Button>
            <Button
              onClick={() => dispatch(logout())}
              sx={{
                textTransform: "none",
                fontSize: "13px",
                color: "custom.navbarIcon",
                minWidth: "auto",
                padding: "4px 8px",
                marginLeft: "6px",
              }}
            >
              Sign Out
            </Button>
          </Box>
        )}
        <Box
          component={NavLink}
          to={"/wishlist"}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginLeft: "10px",
            color: "custom.navbarIcon",
          }}
        >
          <FavoriteBorderOutlinedIcon sx={{ fontSize: "24px" }} />
          <Box
            sx={{
              marginLeft: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              position: "relative",
            }}
          >
            <span className="count-number">{wishlist.length}</span>
          </Box>
        </Box>
        <Box
          component={NavLink}
          to={"/cart"}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginLeft: "15px",
            color: "custom.navbarIcon",
          }}
        >
          <AddShoppingCartOutlinedIcon sx={{ fontSize: "24px" }} />
          <Box
            sx={{
              marginLeft: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              position: "relative",
            }}
          >
            <span className="count-number">{cartCount}</span>
          </Box>
        </Box>
        <IconButton sx={{ marginLeft: "10px" }} onClick={handleThemeMode}>
          {themeMode === "light" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
