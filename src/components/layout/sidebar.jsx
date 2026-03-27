import React from "react";
import { Drawer, Menu, Divider, Typography } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  TagOutlined,
  ShoppingOutlined,
  HeartOutlined,
  BuildOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    { key: "/categories", icon: <AppstoreOutlined />, label: "Categories" },
    { key: "/offers", icon: <TagOutlined />, label: "Offers" },
    { key: "/orders", icon: <ShoppingOutlined />, label: "My Orders" },
    { key: "/wishlist", icon: <HeartOutlined />, label: "Wishlist" },
    { key: "/build-pc", icon: <BuildOutlined />, label: "Build PC" },
    { type: "divider" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
    { key: "/help", icon: <QuestionCircleOutlined />, label: "Help Center" },
  ];

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0, color: "#e53935" }}>
          Menu
        </Title>
      }
      placement="left"
      onClose={onClose}
      open={mobileOpen}
      width={280}
      bodyStyle={{ padding: 0 }}
    >
      <Menu
        mode="inline"
        onClick={({ key }) => {
          if (key.startsWith("/")) {
            navigate(key);
            onClose();
          }
        }}
        style={{ borderRight: "none" }}
      />
    </Drawer>
  );
};

export default Sidebar;
