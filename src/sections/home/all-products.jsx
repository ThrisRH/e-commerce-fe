import React from "react";
import { Row, Col, Typography, Select, Space, Card as AntdCard } from "antd";
import ProductCard from "../../components/ui/products/product-card";

const { Title } = Typography;

const AllProductsSection = ({ products = [], sortOrder, onSortChange }) => {
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
            Tất Cả Sản Phẩm
          </Title>

          <Space>
            <span style={{ color: "white", fontSize: 13 }}>Sắp xếp theo:</span>
            <Select
              value={sortOrder}
              onChange={onSortChange}
              style={{ minWidth: 150, color: "#fff" }}
              variant="filled"
              options={[
                { value: "latest", label: "Mới nhất" },
                { value: "oldest", label: "Cũ nhất" },
              ]}
            />
          </Space>
        </div>

        <div style={{ padding: "32px 16px", backgroundColor: "#fff" }}>
          <Row gutter={[16, 16]}>
            {products.map((product) => (
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
