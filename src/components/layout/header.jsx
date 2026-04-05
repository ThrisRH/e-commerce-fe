import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Input,
  Badge,
  Button,
  Space,
  Typography,
  Popover,
  Avatar,
  Divider,
  Skeleton,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  BuildOutlined,
  SearchOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import CartDrawer, { getCartCount } from "@/components/ui/cart/cart-drawer";
import { fetchMe, logout } from "@/api/auth/auth-lapi";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const syncCount = () => setCartCount(getCartCount());

    window.addEventListener("cart-updated", syncCount);
    window.addEventListener("storage", syncCount);

    if (token) {
      handleFetchMe();
    }

    return () => {
      window.removeEventListener("cart-updated", syncCount);
      window.removeEventListener("storage", syncCount);
    };
  }, [token]);

  const handleFetchMe = async () => {
    setLoading(true);
    try {
      const userData = await fetchMe(token);
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  const profileContent = (
    <div style={{ width: 240, padding: "8px 0" }}>
      {token ? (
        loading ? (
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 8px" }}>
              <Avatar size={48} icon={<UserOutlined />} style={{ backgroundColor: "#e53935" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text strong style={{ fontSize: 16 }}>{user?.name || "User"}</Text>
                <Text type="secondary" style={{ fontSize: 12, textTransform: "uppercase" }}>
                  {user?.roles?.[0] || "Khách hàng"}
                </Text>
              </div>
            </div>
            <Divider style={{ margin: "12px 0" }} />
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ width: "100%", textAlign: "left", height: 40, borderRadius: 8 }}
            >
              Đăng xuất
            </Button>
          </>
        )
      ) : (
        <div style={{ textAlign: "center", padding: "8px" }}>
          <Skeleton.Avatar active size={64} shape="circle" style={{ marginBottom: 16 }} />
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ display: "block" }}>Bạn chưa đăng nhập</Text>
            <Text strong>Hãy tham gia vào GALAXY STORE</Text>
          </div>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              backgroundColor: "#e53935",
              borderRadius: 20,
              height: 40,
            }}
          >
            Đăng nhập / Đăng ký
          </Button>
        </div>
      )}
    </div>
  );

  const handleCartOpen = () => {
    setCartCount(getCartCount());
    setCartOpen(true);
  };

  return (
    <>
      <AntHeader
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#e53935",
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
            maxWidth: 1280,
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
            <Badge
              count={cartCount}
              size="small"
              offset={[5, 5]}
              styles={{
                indicator: {
                  background: "#fff",
                  color: "#e53935",
                  fontWeight: 700,
                  boxShadow: "none",
                },
              }}
            >
              <Button
                type="text"
                icon={
                  <ShoppingCartOutlined
                    style={{ color: "white", fontSize: 20 }}
                  />
                }
                onClick={handleCartOpen}
              />
            </Badge>

            <Popover
              content={profileContent}
              trigger="click"
              placement="bottomRight"
              overlayStyle={{ paddingTop: 12 }}
            >
              <Button
                type="text"
                icon={<UserOutlined style={{ color: "white", fontSize: 18 }} />}
              />
            </Popover>

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

      <CartDrawer
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
          setCartCount(getCartCount());
        }}
      />
    </>
  );
};

export default Header;
