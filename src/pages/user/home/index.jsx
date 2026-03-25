import React, { useState, useEffect } from "react";
import { Breadcrumb, Typography, Space, Spin, Image } from "antd";
import AllProductsSection from "../../../sections/home/all-products";
import { fetchProducts } from "../../../api/products/ProductApi";
import { enqueueSnackbar } from "notistack";
import { Product } from "@/models/product";
import banner1 from "@/assets/images/banner1.png"; // Assuming it exists or I can just use placeholder if it's broken

const { Title } = Typography;

const Home = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  /** @type {[Product[], Function]} */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div style={{ padding: "32px 50px", margin: "0 auto" }}>
      <div style={{ marginBottom: 48, width: "100%" }}>
        <Image
          src={banner1}
          alt="Banner"
          preview={false}
          wrapperStyle={{ width: "100%" }}
          style={{
            width: "100%",
            height: 500,
            borderRadius: 8,
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      <Space direction="vertical" size={48} style={{ width: "100%" }}>
        <AllProductsSection
          products={products}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      </Space>
    </div>
  );
};

export default Home;
