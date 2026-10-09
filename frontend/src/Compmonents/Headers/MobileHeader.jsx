import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Box, InputBase, IconButton, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { NavLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../Redux/Slices/ui";
import { logout } from "../../Redux/Slices/authSlice";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import logo from "../../../src/assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../../Redux/Slices/productsSlice";

export default function MobileHeader({ search, setSearch }) {
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const shopCart = useSelector((state) => state.cart.shopCart);
  const cartCount = shopCart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const themeMode = useSelector((state) => state.ui.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector((state) => state.products.filters);

  const fetchCategories = useSelector((state) => {
    return state.homePage.categoryResponse;
  });

  const allCategories = fetchCategories.map((category) => {
    return category;
  });

  function handleSearch() {
    if (search !== "") {
      dispatch(setFilters({ ...filters, search: search.trim() }));
      navigate("/products");
    }
    setSearch("");
  }

  const DrawerList = (
    <Box sx={{ width: 250, position: "relative" }} role="presentation">
      <IconButton
        aria-label="close"
        onClick={() => setOpenMenu(false)}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        component="ul"
        className="mobile-nav-link"
        sx={{
          listStyle: "none",
          margin: 0,
          padding: "70px 20px 20px",
          color: "custom.navbarText",
        }}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setOpenMenu(false)}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setOpenMenu(false)}
          >
            Products
          </NavLink>
        </li>

        <li>
          <Accordion
            disableGutters
            elevation={0}
            square
            sx={{
              bgcolor: "transparent",
              boxShadow: "none",
              paddingLeft: "10px",

              "&::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon />}
              sx={{
                p: 0,
                minHeight: 48,

                "&.Mui-expanded": {
                  minHeight: 48,
                },

                "& .MuiAccordionSummary-content": {
                  m: 0,
                },

                "& .MuiAccordionSummary-content.Mui-expanded": {
                  m: 0,
                },
              }}
            >
              <Typography fontWeight={500}>Categories</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <ul
                className="categories-list"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {allCategories.map((category) => (
                  <li key={category.slug}>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to={`/products/category/${category.slug}`}
                      onClick={() => {
                        setOpenMenu(false);
                        dispatch(
                          setFilters({
                            ...filters,
                            category: category.slug,
                            search: "",
                          }),
                        );
                      }}
                      sx={{
                        display: "block",
                        padding: "10px 0 10px 18px",
                        textDecoration: "none",
                        color: "#444",
                        fontSize: "15px",
                      }}
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setOpenMenu(false)}
          >
            About Us
          </NavLink>
        </li>
      </Box>
    </Box>
  );

  function handleThemeMode() {
    dispatch(toggleMode());
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setOpenMenu(true);
            }}
            style={{ padding: 0, marginRight: "20px" }}
          >
            <ListIcon fontSize="medium" />
          </IconButton>
          <Drawer
            open={openMenu}
            onClose={() => {
              setOpenMenu(false);
            }}
          >
            {DrawerList}
          </Drawer>
        </div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logo}
              sx={{
                width: {
                  xs: 28,
                  md: 40,
                },
                height: {
                  xs: 28,
                  md: 40,
                },
                objectFit: "contain",
              }}
            ></Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "18px",
                },
                color: "custom.text",
              }}
            >
              NEXORA
            </Typography>
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
                  padding: "4px 6px",
                  marginRight: "10px",
                }}
              >
                Sign In
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "custom.text",
                  }}
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
                    marginLeft: "4px",
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
                    padding: "4px 6px",
                    marginLeft: "4px",
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
                position: "relative",
                color: "custom.navbarIcon",
              }}
            >
              <FavoriteBorderOutlinedIcon
                sx={{
                  fontSize: {
                    xs: "20px",
                    sm: "24px",
                  },
                }}
              />
              <Box component="span" className="mobile-count-number">
                {wishlist.length}
              </Box>
            </Box>
            <Box
              component={NavLink}
              to={"/cart"}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
                color: "custom.navbarIcon",
                marginLeft: {
                  xs: "15px",
                  sm: "30px",
                },
              }}
            >
              <AddShoppingCartOutlinedIcon
                sx={{
                  fontSize: {
                    xs: "20px",
                    sm: "24px",
                  },
                }}
              />
              <span className="mobile-count-number">{cartCount}</span>
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
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          border: "1px solid",
          borderColor: theme.palette.custom.borderC,
          bgcolor: "custom.search",
          borderRadius: "14px",
          overflow: "hidden",
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
            px: 1.75,
            fontSize: "14px",
            borderColor: "custom.border",

            "& input::placeholder": {
              fontSize: "14px",
            },
          }}
        />

        <IconButton
          onClick={handleSearch}
          sx={{
            color: "white",
            bgcolor: "primary.main",
            borderRadius: 0,
            px: 1,
            "&:hover": {
              bgcolor: "#8e24aa",
            },
          }}
        >
          <SearchIcon sx={{ fontSize: "22px" }} />
        </IconButton>
      </Box>
    </>
  );
}
