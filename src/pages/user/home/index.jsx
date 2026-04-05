// @ts-ignore
import React, { useState, useEffect } from "react";
// @ts-ignore
import { Typography, Space, Spin } from "antd";
import AllProductsSection from "../../../sections/home/all-products";
import { fetchProducts } from "../../../api/products/product-lapi";
import { enqueueSnackbar } from "notistack";
import { Product } from "@/models/product";
// @ts-ignore
import LatestProInCateSection from "@/sections/home/latest-in-cart";
import { fetchCateSection } from "@/api/home/cate-section-lapi";
import BannerSection from "@/sections/home/banner";

// @ts-ignore
const { Title } = Typography;

const Home = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  /** @type {[Product[], Function]} */
  const [products, setProducts] = useState([]);

  const [latestProductsByCategory, setLatestProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProducts(), fetchCateSection()])
      .then(([proRes, cateRes]) => {
        setProducts(proRes.data);
        setLatestProductsByCategory(cateRes.data);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 0px", margin: "0 auto" }}>
      <BannerSection />

      <Space direction="vertical" size={48} style={{ width: "100%" }}>
        <AllProductsSection
          products={products}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {latestProductsByCategory.map((item, index) => {
          return (
            <LatestProInCateSection
              key={index}
              cateName={item.cate_name}
              latestProducts={item.products}
            />
          );
        })}
      </Space>
    </div>
  );
};

export default Home;
