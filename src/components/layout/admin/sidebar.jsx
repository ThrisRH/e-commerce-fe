import React, { useState, useEffect } from "react";
import { Layout, Tooltip } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "@/constants/menu-items";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import "./style.css";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  // Auto-expand menu that contains current active path
  useEffect(() => {
    const parent = menuItems.find(
      (item) =>
        item.children &&
        item.children.some((child) => location.pathname.startsWith(child.key)),
    );
    if (parent && !openKeys.includes(parent.key)) {
      setOpenKeys([...openKeys, parent.key]);
    }
  }, [location.pathname]);

  const toggleSubmenu = (key) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const renderMenuItem = (item, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = openKeys.includes(item.key);
    const isActive = hasChildren
      ? item.children.some((child) => location.pathname === child.key)
      : location.pathname === item.key;
    const isLogout = item.danger;

    return (
      <div key={item.key} style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip
          title={collapsed ? item.label : ""}
          placement="right"
          disabled={!collapsed}
        >
          <div
            className={`sidebar-item ${isActive ? "active" : ""} ${isLogout ? "logout" : ""} ${collapsed ? "collapsed" : ""} ${isChild ? "child-item" : ""}`}
            onClick={() => {
              if (hasChildren && !collapsed) {
                toggleSubmenu(item.key);
              } else {
                navigate(item.key);
              }
            }}
          >
            {item.icon}

            {!collapsed && (
              <>
                <p className="sidebar-label text-sm" style={{ flex: 1 }}>
                  {item.label}
                </p>
                {hasChildren && (
                  <span style={{ fontSize: "10px", opacity: 0.6 }}>
                    {isExpanded ? <DownOutlined /> : <RightOutlined />}
                  </span>
                )}
              </>
            )}
          </div>
        </Tooltip>

        {!collapsed && hasChildren && isExpanded && (
          <div className="sidebar-submenu">
            {item.children.map((child) => renderMenuItem(child, true))}
          </div>
        )}
      </div>
    );
  };

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
            Trang Quản Trị
          </h2>
        )}
      </div>

      <nav
        style={{
          padding: "0 12px",
          display: "flex",
          flexDirection: "column",
          gap: `8px`,
          height: "calc(100vh - 100px)",
        }}
      >
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </Sider>
  );
};

export default Sidebar;
