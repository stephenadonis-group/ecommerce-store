import { Box, Typography, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { fetchProductsData } from "../../Redux/Slices/productsSlice";
import ProductSkeleton from "./ProductSkeleton";

export default function ShowProducts({
  page,
  setPage,
  sort,
  setSort,
  category,
}) {
  const dispatch = useDispatch();

  const productsReponse = useSelector(
    (state) => state.products.productsResponse,
  );
  const status = useSelector((state) => state.products.status);

  const totalPage = Math.ceil(productsReponse.total / 12);

  const filters = useSelector((state) => state.products.filters);

  useEffect(() => {
    dispatch(
      fetchProductsData({
        page,
        ...filters,
        sort,
        category: category || filters.category,
      }),
    );
  }, [page, filters, sort, category, dispatch]);

  function handleSortChange(e) {
    setSort(e.target.value);
    setPage(1);
  }

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "80%",
        },
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          justifyContent: "space-between",
          backgroundColor: "custom.card",
          alignItems: "center",
          border: "1px solid",
          borderColor: "custom.border",
          padding: "15px 10px",
          borderRadius: "10px",
          mb: 3,
        }}
      >
        <Typography variant="bod1" sx={{ color: "custom.text" }}>
          {productsReponse.total} Products
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ fontSize: "14px", color: "custom.textSecondary" }}
            variant="baody2"
          >
            Sort by:
          </Typography>

          <Select
            variant="standard"
            disableUnderline
            sx={{
              marginLeft: "10px",
              fontSize: "14px",

              "& .MuiSelect-select": {
                padding: "5px 20px",
                border: "1px solid",
                borderColor: "custom.border",
                borderRadius: "6px",
              },

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

      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        {status === "loading"
          ? Array.from({ length: 12 }).map((_, index) => (
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
          : productsReponse.products?.map((product) => {
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

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Pagination
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "primary.main",
              color: "#fff",
            },
          }}
          count={totalPage}
          page={page}
          onChange={(e, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
