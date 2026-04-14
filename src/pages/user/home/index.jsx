// @ts-ignore
import React, { useState, useEffect } from "react";
// @ts-ignore
import { Typography, Space, Spin } from "antd";
import AllProductsSection from "../../../sections/home/all-products";
import { fetchProducts } from "../../../api/products/product-api";
import { enqueueSnackbar } from "notistack";
import { Product } from "@/models/product";
// @ts-ignore
import LatestProInCateSection from "@/sections/home/latest-in-cart";
import { fetchCateSection } from "@/api/home/cate-section-api";
import { fetchCategories } from "@/api/categories/category-api";
import BannerSection from "@/sections/home/banner";
import CategoryListSection from "@/sections/home/category-list";

// @ts-ignore
const { Title } = Typography;

const Home = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  /** @type {[Product[], Function]} */
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [latestProductsByCategory, setLatestProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetchProducts({ limit: 12 }),
      fetchCateSection(),
      fetchCategories({ limit: 16 }),
    ])
      .then(([proRes, cateRes, allCateRes]) => {
        setProducts(proRes.data);
        setLatestProductsByCategory(cateRes.data);
        setCategories(allCateRes.data);
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
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 0px", margin: "0 auto" }}>
      <BannerSection />

      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <CategoryListSection categories={categories} />
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
