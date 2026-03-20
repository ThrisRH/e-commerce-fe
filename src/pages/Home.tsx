import React, { useState, useEffect } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import banner1 from "../assets/images/banner1.png";
import AllProductsSection from "../sections/home/AllProducts";
import type { Product } from "../types/product";
import { fetchProducts } from "../api/products/ProductApi";
import { enqueueSnackbar } from "notistack";

const Home: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        component="img"
        src={banner1}
        alt="banner1"
        sx={{
          width: "100%",
          height: 500,
          objectFit: "cover",
          mb: 6,
          borderRadius: 1,
          overflow: "hidden",
        }}
      />

      {/* <SaleSection saleProducts={saleProducts} />

      <BestSellerSection bestSellers={bestSellers} /> */}

      <AllProductsSection
        products={products}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
    </Container>
  );
};

export default Home;
