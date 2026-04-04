import React from "react";
import { Row, Col, Typography, Select, Space, Card as AntdCard } from "antd";
import ProductCard from "../../components/ui/products/product-card";
import AppButton from "@/components/common/button";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AllProductsSection = ({ products = [], sortOrder, onSortChange }) => {
  const navigate = useNavigate();

  return (
    <div id="all-products">
      <AntdCard
        bodyStyle={{ padding: 0 }}
        style={{
          overflow: "hidden",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#e53935",
            padding: "16px 24px",
          }}
        >
          <Title
            level={3}
            style={{ fontWeight: 700, color: "white", margin: 0 }}
          >
            Sản phẩm mới nhất
          </Title>

          <AppButton
            label={"Xem tất cả"}
            onClick={() => {
              navigate("/category");
            }}
            width="150px"
          />
        </div>

        <div style={{ padding: "32px 16px", backgroundColor: "#fff" }}>
          <Row gutter={[12, 12]}>
            {products.slice(0, 10).map((product) => (
              <Col key={product.id} xs={12} sm={8} md={6} lg={6} xxl={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </AntdCard>
    </div>
  );
};

export default AllProductsSection;
