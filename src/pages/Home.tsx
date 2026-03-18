import React, { useState, useMemo } from "react";
import { Container, Box } from "@mui/material";
import banner1 from "../assets/images/banner1.png";
import iphone15pro from "../assets/images/iphone15pro.png";
import SaleSection from "../sections/home/Sale";
import BestSellerSection from "../sections/home/BestSeller";
import AllProductsSection from "../sections/home/AllProducts";
import type { Product } from "../types/product";

// Extend Product type for dummy data use cases (isSale, isBestSeller, date)
interface HomeProduct extends Product {
  date: string;
  isSale: boolean;
  isBestSeller: boolean;
}

const DUMMY_PRODUCTS: HomeProduct[] = [
  {
    id: 1,
    name: "MacBook Pro 14 M3",
    price: 39000000,
    specs: "8CPU/10GPU/16GB/512GB",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-03-01",
    isSale: true,
    isBestSeller: true,
    slug: "macbook-pro-14-m3",
    description: "MacBook Pro 14 M3 with Apple M3 chip.",
    sale_price: 38000000,
    image_url:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    category_id: 1,
    brand_id: 1,
    is_active: true,
    stock: 10,
    created_at: "2024-03-01",
    updated_at: "2024-03-01",
  },
  {
    id: 2,
    name: "iPad Air M2 11 inch",
    price: 16490000,
    specs: "Wifi/128GB",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-03-05",
    isSale: false,
    isBestSeller: true,
    slug: "ipad-air-m2-11-inch",
    description: "iPad Air with M2 chip and 11-inch display.",
    sale_price: 16490000,
    image_url:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    category_id: 2,
    brand_id: 1,
    is_active: true,
    stock: 15,
    created_at: "2024-03-05",
    updated_at: "2024-03-05",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 6990000,
    specs: "Active Noise Cancelling",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-02-15",
    isSale: true,
    isBestSeller: false,
    slug: "sony-wh-1000xm5",
    description: "Industry-leading noise cancelling headphones.",
    sale_price: 6490000,
    image_url:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    category_id: 4,
    brand_id: 3,
    is_active: true,
    stock: 20,
    created_at: "2024-02-15",
    updated_at: "2024-02-15",
  },
  {
    id: 4,
    name: "Logitech MX Master 3S",
    price: 2490000,
    specs: "Wireless Mouse",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-01-20",
    isSale: false,
    isBestSeller: false,
    slug: "logitech-mx-master-3s",
    description: "An iconic mouse remastered for ultimate precision.",
    sale_price: 2490000,
    image_url:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    category_id: 5,
    brand_id: 4,
    is_active: true,
    stock: 30,
    created_at: "2024-01-20",
    updated_at: "2024-01-20",
  },
  {
    id: 5,
    name: "Keychron Q1 Max",
    price: 4290000,
    specs: "Mechanical Keyboard",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2024-03-10",
    isSale: true,
    isBestSeller: false,
    slug: "keychron-q1-max",
    description: "Full metal QMK/VIA custom mechanical keyboard.",
    sale_price: 3990000,
    image_url:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    category_id: 5,
    brand_id: 5,
    is_active: true,
    stock: 25,
    created_at: "2024-03-10",
    updated_at: "2024-03-10",
  },
  {
    id: 6,
    name: "Dell UltraSharp U2723QE",
    price: 14590000,
    specs: "27 inch 4K IPS",
    image:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    date: "2023-12-15",
    isSale: false,
    isBestSeller: true,
    slug: "dell-ultrasharp-u2723qe",
    description: "27-inch 4K USB-C Hub monitor with IPS Black technology.",
    sale_price: 13990000,
    image_url:
      "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw",
    category_id: 3,
    brand_id: 2,
    is_active: true,
    stock: 15,
    created_at: "2023-12-15",
    updated_at: "2023-12-15",
  },
  {
    id: 7,
    name: "iPhone 15 Pro",
    price: 28990000,
    specs: "256GB, Blue Titanium",
    image: iphone15pro,
    date: "2024-03-15",
    isSale: true,
    isBestSeller: true,
    slug: "iphone-15-pro-256gb",
    description: "The latest iPhone with A17 Pro chip and titanium design.",
    sale_price: 27990000,
    image_url: iphone15pro,
    category_id: 1,
    brand_id: 1,
    is_active: true,
    stock: 50,
    created_at: "2024-03-15",
    updated_at: "2024-03-15",
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
          height: 500,
          objectFit: "cover",
          mb: 6,
          borderRadius: 1,
          overflow: "hidden",
        }}
      />

      <SaleSection saleProducts={saleProducts} />

      <BestSellerSection bestSellers={bestSellers} />

      <AllProductsSection
        products={sortedProducts}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
    </Container>
  );
};

export default Home;
