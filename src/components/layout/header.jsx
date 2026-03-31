import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Badge, Button, Space, Typography, Tooltip } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  BuildOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#e53935",
        height: 58,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: "white", fontSize: 20 }} />}
          onClick={onMenuClick}
          className="mobile-menu-btn"
          style={{ display: "none", marginRight: 16 }}
        />

        <Title
          level={4}
          style={{
            color: "white",
            margin: 0,
            cursor: "pointer",
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
          onClick={() => navigate("/")}
        >
          GALAXY STORE PHP
        </Title>

        <div style={{ flex: 1, margin: "0 40px", maxWidth: 600 }}>
          <Input
            prefix={<SearchOutlined style={{ color: "#e53935" }} />}
            placeholder="Tìm kiến sản phẩm của bạn..."
            className="search-input"
            variant="filled"
            style={{ borderRadius: 24, backgroundColor: "white" }}
          />
        </div>

        <Space size="large" style={{ color: "white" }}>
          <Badge count={0} size="small" offset={[5, 5]}>
            <Button
              type="text"
              icon={
                <ShoppingCartOutlined
                  style={{ color: "white", fontSize: 18 }}
                />
              }
              onClick={() => {}}
            />
          </Badge>

          <Button
            type="text"
            icon={<UserOutlined style={{ color: "white", fontSize: 18 }} />}
            onClick={() => {}}
          />

          <Button
            type="text"
            icon={<BuildOutlined style={{ color: "white", fontSize: 18 }} />}
            onClick={() => navigate("/build-pc")}
          />
        </Space>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          Title { font-size: 16px !important; }
          .search-input { display: none !important; }
        }
      `}</style>
    </AntHeader>
  );
};

export default Header;
