import React, { useState } from "react";
import { Layout, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";

const { Content } = Layout;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e53935", // Match the red theme mentioned in previous conversations
          borderRadius: 4,
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Header onMenuClick={handleDrawerToggle} />
        <Navbar />
        <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

        <Content style={{ padding: "0 24px", background: "#f5f5f5" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Outlet />
          </div>
        </Content>

        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
