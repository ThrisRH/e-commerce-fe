import React from "react";
import { Layout, Avatar, Dropdown, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ collapsed, toggleCollapsed }) => {
  const userMenuItems = [
    {
      key: "1",
      label: "Trang cá nhân",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Đăng xuất",
      danger: true,
    },
  ];

  return (
    <AntHeader
      style={{
        padding: "0 24px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        boxShadow: "0 1px 4px rgba(0,21,41,.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.2,
          }}
        >
          <Text strong style={{ fontSize: 14 }}>
            Administrator
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            admin@galaxy.store
          </Text>
        </div>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              style={{ backgroundColor: "#1890ff" }}
              icon={<UserOutlined />}
            />
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
