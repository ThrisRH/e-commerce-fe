import React, { useEffect, useState } from "react";
import { Menu, Layout, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCategories } from "@/api/categories/category-api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories({ page: 1, limit: 10 })
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((err) => {
        console.error("Lỗi tải category:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === "/build-pc") {
      navigate(key);
    } else {
      navigate(`/category?category_id=${key}`);
    }
  };

  const menuItems = [
    ...categories.map((cat) => ({
      key: String(cat.id),
      label: cat.name,
    })),
    {
      key: "/build-pc",
      label: "Dựng cấu hình PC",
      style: { color: "#e53935", fontWeight: 700 },
    },
  ];

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
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="small" />
          </div>
        ) : (
          <Menu
            mode="horizontal"
            style={{
              borderBottom: "none",
              height: 48,
              lineHeight: "48px",
              fontSize: 13,
              fontWeight: 500,
            }}
            items={menuItems}
            onClick={handleMenuClick}
            selectedKeys={[]}
          />
        )}
      </div>
    </Layout.Header>
  );
};

export default Navbar;
