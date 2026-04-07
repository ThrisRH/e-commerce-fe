import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const CategoryListSection = ({ categories = [] }) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 48, padding: "0 10px" }}>
      <Title
        level={3}
        style={{ marginBottom: 32, textAlign: "center", fontWeight: 700 }}
      >
        DANH MỤC NỔI BẬT
      </Title>

      <Row gutter={[16, 16]} justify="center">
        {categories.map((cate) => (
          <Col key={cate.id} xs={8} sm={6} md={4} lg={3}>
            <div
              onClick={() => navigate(`/category?category_id=${cate.id}`)}
              style={{
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              className="cate-item"
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                  marginBottom: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  border: "1px solid #f0f0f0",
                  overflow: "hidden",
                }}
              >
                <img
                  alt={cate.name}
                  src={cate.image_url || "https://via.placeholder.com/100"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              <Typography.Text
                strong
                style={{ fontSize: 14, color: "#262626" }}
              >
                {cate.name}
              </Typography.Text>
            </div>
          </Col>
        ))}
      </Row>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .cate-item:hover {
          transform: translateY(-5px);
        }
        .cate-item:hover img {
          transform: scale(1.1);
        }
        .cate-item:hover div {
          border-color: #e53935;
          boxShadow: 0 4px 12px rgba(229,57,53,0.12);
        }
      `,
        }}
      />
    </div>
  );
};

export default CategoryListSection;
