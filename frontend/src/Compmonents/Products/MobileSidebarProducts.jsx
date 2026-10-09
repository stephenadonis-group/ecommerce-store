import {
  Box,
  Typography,
  Select,
  MenuItem,
  Slider,
  Radio,
  RadioGroup,
  Rating,
  Button,
  FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setFilters } from "../../Redux/Slices/productsSlice";
import logo from "../../../src/assets/Images/logo.png";
import { useNavigate } from "react-router-dom";

export default function MobileSidebarProducts({
  sort,
  setPage,
  setSort,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
}) {
  const productsReponse = useSelector(
    (state) => state.products.productsResponse,
  );

  const maximumPrice = useSelector((state) =>
    Math.round(state.products.productsResponse.maximumPrice),
  );

  const currentPriceRange = priceRange ?? [0, maximumPrice];

  const fetchCategories = useSelector((state) => {
    return state.homePage.categoryResponse;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function handleSortChange(e) {
    setSort(e.target.value);
    setPage(1);
  }

  const categoriesLists = fetchCategories.map((category) => (
    <FormControlLabel
      key={category.slug}
      value={category.slug}
      control={
        <Radio
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 15,
            },
          }}
        />
      }
      label={category.name}
      sx={{
        "& .MuiFormControlLabel-label": {
          fontSize: "12px",
        },
      }}
    />
  ));

  function handleClearAll() {
    setSelectedCategory("All Categories");
    setPriceRange(null);
    setSelectedRating(0);
    setPage(1);

    dispatch(
      setFilters({
        category: "All Categories",
        minPrice: 0,
        maxPrice: null,
        rating: 0,
        search: "",
      }),
    );

    navigate("/products");
  }

  const handleApply = () => {
    setOpen(false);
    setPage(1);

    dispatch(
      setFilters({
        category: selectedCategory,
        minPrice: currentPriceRange[0],
        maxPrice: currentPriceRange[1],
        rating: selectedRating,
        search: "",
      }),
    );

    navigate(
      selectedCategory === "All Categories"
        ? "/products"
        : `/products/category/${selectedCategory}`,
    );
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "custom.card",
        height: "100%",
        p: 2,
        borderRadius: 2,
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <Box
          component="img"
          src={logo}
          sx={{
            width: 30,
            height: 30,
            objectFit: "contain",
          }}
        ></Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: "25px",
            color: "custom.text",
          }}
        >
          NEXORA
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0 20px",
        }}
      >
        <Typography variant="h6" sx={{ color: "custom.text" }}>
          Filters
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleClearAll}
        >
          Clear All
        </Typography>
      </Box>

      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          margin: "10px 0",
          "&::before": {
            opacity: 1,
            backgroundColor: "custom.border",
          },
          "&.Mui-expanded::before": {
            opacity: 1,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Categories
          </Typography>
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
            <RadioGroup
              className="category-radio"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPriceRange(null);
              }}
            >
              <FormControlLabel
                value="All Categories"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                }
                label="All Categories"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "12px",
                  },
                }}
              />
              {categoriesLists}
            </RadioGroup>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          margin: "10px 0",
          "&::before": {
            opacity: 1,
            backgroundColor: "custom.border",
          },
          "&.Mui-expanded::before": {
            opacity: 1,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Price Range
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">${currentPriceRange[0]}</Typography>
            <Typography variant="caption">${currentPriceRange[1]}</Typography>
          </Box>

          <Slider
            sx={{
              height: 4,
              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
              },
            }}
            value={currentPriceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            min={0}
            max={maximumPrice}
            valueLabelDisplay="auto"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          margin: "10px 0",
          "&::before": {
            opacity: 1,
            backgroundColor: "custom.border",
          },
          "&.Mui-expanded::before": {
            opacity: 1,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Rating
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          <RadioGroup
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          >
            <FormControlLabel
              value={5}
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={5} readOnly size="small" />
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "14px",
                      color: "custom.textSecondary",
                    }}
                  >
                    (5)
                  </Typography>
                </Box>
              }
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                },
              }}
            />
            <FormControlLabel
              value="4"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={4} readOnly size="small" />
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "14px",
                      color: "custom.textSecondary",
                    }}
                  >
                    (4 - 5)
                  </Typography>
                </Box>
              }
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                },
              }}
            />
            <FormControlLabel
              value="3"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={3} readOnly size="small" />
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "14px",
                      color: "custom.textSecondary",
                    }}
                  >
                    (3 - 4)
                  </Typography>
                </Box>
              }
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                },
              }}
            />
            <FormControlLabel
              value="2"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={2} readOnly size="small" />
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "14px",
                      color: "custom.textSecondary",
                    }}
                  >
                    (2 - 3)
                  </Typography>
                </Box>
              }
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                },
              }}
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 0",
          borderTop: "1px solid",
          borderColor: "custom.border",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "custom.heroButton",
            color: "custom.heroButtonText",
            display: "flex",
            justifyContent: "center",
            textTransform: "capitalize",
          }}
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "custom.card",
            padding: "10px 20px",
            borderRadius: "12px",
            border: "1px solid",
            borderColor: "custom.border",
            flex: 1,
          }}
          onClick={toggleDrawer(true)}
        >
          <TuneIcon fontSize="small" sx={{ color: "custom.navbarIcon" }} />
          <Typography
            sx={{
              fontSize: "16px",
              marginLeft: "10px",
              fontWeight: "bold",
              color: "custom.text",
            }}
            variant="baody2"
          >
            Filters
          </Typography>
        </Box>
        {/* Drawer */}

        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>

        {/* === Drawer === */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "custom.card",
            padding: "10px 20px",
            borderRadius: "12px",
            border: "1px solid",
            borderColor: "custom.border",
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "custom.textSecondary",
              marginRight: "10px",
            }}
            variant="baody2"
          >
            Sort by:
          </Typography>

          <Select
            variant="standard"
            disableUnderline
            sx={{
              flex: 1,
              fontSize: "14px",
              fontWeight: "bold",

              "&:hover .MuiSelect-select": {
                borderColor: "custom.border",
              },

              "&.Mui-focused .MuiSelect-select": {
                borderColor: "custom.border",
              },
            }}
            value={sort}
            onChange={handleSortChange}
          >
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Rating: High to Low</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box sx={{ mb: 3, color: "custom.text" }}>
        <Typography variant="bod1">
          {productsReponse.total} Products Found
        </Typography>
      </Box>
    </>
  );
}
