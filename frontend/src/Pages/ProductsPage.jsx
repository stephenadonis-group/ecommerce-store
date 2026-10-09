import ShowProducts from "../Compmonents/Products/ShowProducts";
import HeaderProducts from "../Compmonents/Products/HeaderProducts";
import SidebarProducts from "../Compmonents/Products/SidebarProducts";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import MobileSidebarProducts from "../Compmonents/Products/MobileSidebarProducts";
import Features from "../Compmonents/home/Features";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ProductsPage() {
  const { category } = useParams();

  const isDesktop = useMediaQuery("(min-width:900px)");

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("featured");

  const [selectedCategory, setSelectedCategory] = useState(
    category || "All Categories",
  );

  const [priceRange, setPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);

  const search = useSelector((state) => state.products.filters.search);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(category || "All Categories");
    setPage(1);
  }, [category]);

  return (
    <>
      <HeaderProducts />

      <Box
        sx={{
          display: {
            xs: "block",
            md: "flex",
          },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {isDesktop ? (
          <SidebarProducts
            setPage={setPage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        ) : (
          <MobileSidebarProducts
            setPage={setPage}
            sort={sort}
            setSort={setSort}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        )}

        <ShowProducts
          page={page}
          setPage={setPage}
          sort={sort}
          setSort={setSort}
          category={category}
        />
      </Box>

      <Features />
    </>
  );
}
