import React from "react";
import { Menu, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { BuildOutlined } from "@ant-design/icons";

const categories = [
  { label: "PC", key: "pc" },
  { label: "Laptop văn phòng", key: "laptop-van-phong" },
  { label: "Laptop gaming", key: "laptop-gaming" },
  { label: "Máy tính bảng", key: "may-tinh-bang" },
  { label: "Thiết bị âm thanh", key: "thiet-bi-am-thanh" },
  { label: "Phụ kiện", key: "phu-kien" },
  { label: "Dựng cấu hình PC", key: "/build-pc" },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Layout.Header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #f0f0f0",
        height: 48,
        display: "flex",
        alignItems: "center",
        padding: "0 50px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto" }}>
        <Menu
          mode="horizontal"
          style={{
            borderBottom: "none",
            height: 48,
            lineHeight: "48px",
            fontSize: 13,
            fontWeight: 500,
          }}
          items={categories.map(({ label, key }) => ({
            key,
            label,
            style:
              key === "/build-pc" ? { color: "#e53935", fontWeight: 700 } : {},
          }))}
          onClick={({ key }) => {
            if (key.startsWith("/")) {
              navigate(key);
            }
          }}
        />
      </div>
    </Layout.Header>
  );
};

export default Navbar;
