import { Box, Grid, Typography, Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoriesAPI, productsAPI } from "../api/endpoints";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function fetchCategories() {
      try {
        setStatus("loading");

        const categoryList = await categoriesAPI.getAll();

        const showCategories = await Promise.all(
          categoryList.map(async (category) => {
            if (category.image) return { ...category };
            const res = await productsAPI.getAll({
              category: category.slug,
              page: 1,
              limit: 1,
            });
            return { ...category, image: res.products[0]?.thumbnail };
          }),
        );

        setCategories(showCategories);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
        console.log(error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <Box sx={{ margin: "30px 0" }}>
      <Box
        sx={{
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "custom.text",
            fontSize: {
              xs: "24px",
              sm: "30px",
            },
          }}
        >
          All Categories
        </Typography>

        <Typography
          sx={{
            marginTop: "8px",
            color: "custom.textSecondary",
            fontSize: {
              xs: "13px",
              sm: "15px",
            },
          }}
        >
          Explore our product categories
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {status === "loading"
          ? Array.from({ length: 12 }).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                }}
              >
                <Box
                  sx={{
                    padding: "15px 10px",
                    border: "1px solid",
                    borderColor: "custom.border",
                    borderRadius: "16px",
                    backgroundColor: "custom.card",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={150}
                    sx={{ borderRadius: "20px" }}
                  />

                  <Skeleton
                    variant="text"
                    width="70%"
                    height={30}
                    sx={{ marginTop: "8px" }}
                  />
                </Box>
              </Grid>
            ))
          : categories.map((category) => (
              <Grid
                key={category.slug}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                }}
              >
                <Box
                  component={NavLink}
                  to={`/products/category/${category.slug}`}
                  sx={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "15px 10px",
                    border: "1px solid",
                    borderColor: "custom.border",
                    borderRadius: "16px",
                    backgroundColor: "custom.card",
                    transition: "0.2s",

                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "custom.background",
                      width: {
                        xs: "110px",
                        sm: "130px",
                        md: "150px",
                      },
                      height: {
                        xs: "110px",
                        sm: "130px",
                        md: "150px",
                      },
                      borderRadius: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: "75%",
                        height: "75%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "14px",
                        sm: "15px",
                        md: "16px",
                      },
                      fontWeight: "500",
                      color: "custom.text",
                      textAlign: "center",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
