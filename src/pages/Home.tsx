import React, { useState, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ProductCard from "../components/ui/products/ProductCard";
import { Image } from "@mui/icons-material";
import banner1 from "../assets/images/banner1.png";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "MacBook Pro 14 M3",
    price: "39.990.000đ",
    specs: "8CPU/10GPU/16GB/512GB",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-03-01",
    isSale: true,
    isBestSeller: true,
  },
  {
    id: 2,
    title: "iPad Air M2 11 inch",
    price: "16.490.000đ",
    specs: "Wifi/128GB",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-03-05",
    isSale: false,
    isBestSeller: true,
  },
  {
    id: 3,
    title: "Sony WH-1000XM5",
    price: "6.990.000đ",
    specs: "Active Noise Cancelling",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-02-15",
    isSale: true,
    isBestSeller: false,
  },
  {
    id: 4,
    title: "Logitech MX Master 3S",
    price: "2.490.000đ",
    specs: "Wireless Mouse",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-01-20",
    isSale: false,
    isBestSeller: false,
  },
  {
    id: 5,
    title: "Keychron Q1 Max",
    price: "4.290.000đ",
    specs: "Mechanical Keyboard",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-03-10",
    isSale: true,
    isBestSeller: false,
  },
  {
    id: 6,
    title: "Dell UltraSharp U2723QE",
    price: "14.590.000đ",
    specs: "27 inch 4K IPS",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2023-12-15",
    isSale: false,
    isBestSeller: true,
  },
];

const Home: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const sortedProducts = useMemo(() => {
    return [...DUMMY_PRODUCTS].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
  }, [sortOrder]);

  const saleProducts = DUMMY_PRODUCTS.filter((p) => p.isSale);
  const bestSellers = DUMMY_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        component="img"
        src={banner1}
        alt="banner1"
        sx={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          mb: 6,
          borderRadius: 4,
          overflow: "hidden",
        }}
      />

      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 700, color: "primary.main" }}
        >
          🏷️ Đang Khuyến Mãi
        </Typography>
        <Grid container spacing={2}>
          {saleProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Best Seller Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          🔥 Bán Chạy Nhất
        </Typography>
        <Grid container spacing={2}>
          {bestSellers.map((product) => (
            <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* All Products Section */}
      <Box id="all-products">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Tất Cả Sản Phẩm
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOrder}
              label="Sắp xếp theo"
              size="small"
              onChange={(e) =>
                setSortOrder(e.target.value as "latest" | "oldest")
              }
            >
              <MenuItem value="latest">Mới nhất</MenuItem>
              <MenuItem value="oldest">Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2}>
          {sortedProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
