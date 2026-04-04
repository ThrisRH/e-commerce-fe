import React from "react";
import { Layout, Tooltip } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "@/constants/menu-items";
import "./style.css";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: "1px solid #f0f0f0",
        background: "#fff",
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: 64,
          margin: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #1890ff 0%, #001529 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            marginRight: collapsed ? 0 : 12,
          }}
        >
          A
        </div>
        {!collapsed && (
          <h2
            style={{
              color: "#001529",
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}
          >
            Admin Panel
          </h2>
        )}
      </div>

      <nav
        style={{
          padding: "0 12px",
          display: "flex",
          flexDirection: "column",
          gap: `12px`,
          height: "calc(100vh - 100px)",
        }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.key;
          const isLogout = item.danger;

          return (
            <Tooltip
              key={item.key}
              title={collapsed ? item.label : ""}
              placement="right"
            >
              <div
                className={`sidebar-item ${isActive ? "active" : ""} ${isLogout ? "logout" : ""} ${collapsed ? "collapsed" : ""}`}
                onClick={() => navigate(item.key)}
              >
                {item.icon}

                {!collapsed && (
                  <p className="sidebar-label text-sm">{item.label}</p>
                )}
              </div>
            </Tooltip>
          );
        })}
      </nav>
    </Sider>
  );
};

export default Sidebar;
