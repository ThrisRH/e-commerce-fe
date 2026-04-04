import React, { useState } from "react";
import { Layout, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          fontFamily: "Roboto, sans-serif",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", display: "flex" }}>
        <Sidebar collapsed={collapsed} />
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 220,
            transition: "all 0.2s",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <Content
            style={{
              padding: "24px",
              margin: 0,
              minHeight: 280,
              backgroundColor: "#f5f5f5",
              flex: 1,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
