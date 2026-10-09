import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Box, Button, MenuItem, Menu } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../Redux/Slices/productsSlice";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  const fetchCategories = useSelector((state) => {
    return state.homePage.categoryResponse;
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const allCategories = fetchCategories.map((category) => {
    return category;
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginLeft: "20px" }}>
      <Box
        component="ul"
        className="nav-link"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "18px",
          position: "relative",
          color: "custom.navbarText",
        }}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>
        </li>

        <li style={{ position: "relative" }}>
          <Button
            onClick={handleClick}
            endIcon={
              anchorEl === null ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
            }
            sx={{
              color: "inherit",
              fontSize: "14px",
              textTransform: "none",
              position: "relative",
              p: 0,
              minWidth: "auto",
              fontWeight: 500,
            }}
          >
            Categories
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 220,
                  height: "50%",
                  borderRadius: 3,
                  boxShadow: "0 10px 30px rgba(0,0,0,.12)",
                  p: 1,
                },
              },
            }}
          >
            {allCategories.map((category) => (
              <MenuItem
                key={category.slug}
                component={NavLink}
                to={`/products/category/${category.slug}`}
                onClick={() => {
                  dispatch(
                    setFilters({
                      ...filters,
                      category: category.slug,
                      search: "",
                    }),
                  );

                  handleClose();
                }}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  px: 2,

                  "&.active": {
                    color: "primary.main",
                    fontWeight: 600,
                  },
                }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About Us
          </NavLink>
        </li>
      </Box>
    </Box>
  );
}
