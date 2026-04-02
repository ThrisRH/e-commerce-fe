import React, { useState, useEffect, useCallback } from "react";
import {
  Drawer,
  Typography,
  Button,
  Spin,
  Empty,
  Divider,
  InputNumber,
  Tag,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { fetchProductById } from "@/api/products/product-lapi";
import { formatCurrency } from "@/components/utils/format-currency";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const SESSION_KEY = "cart";

export function getCartFromSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCartToSession(cart) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(cart));
}

export function getCartCount() {
  return getCartFromSession().reduce((sum, i) => sum + (i.quantity || 1), 0);
}

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { product, quantity } = item;
  if (!product) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 0",
        borderBottom: "1px solid var(--neutral-100, #f5f5f5)",
      }}
    >
      <div
        onClick={() => window.location.replace(`/products/${product.id}`)}
        style={{
          width: 76,
          height: 76,
          flexShrink: 0,
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid var(--neutral-200, #e0e0e0)",
          background: "var(--neutral-50, #fafafa)",
          cursor: "pointer",
        }}
      >
        <img
          src={product.image_url || "https://via.placeholder.com/76x76?text=IMG"}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <Text
          strong
          style={{
            fontSize: 13,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => window.location.replace(`/products/${product.id}`)}
        >
          {product.name}
        </Text>

        {product.brand?.name && (
          <Tag color="blue" style={{ fontSize: 11, borderRadius: 4, width: "fit-content" }}>
            {product.brand.name}
          </Tag>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <Text strong style={{ color: "var(--primary-main, #e53935)", fontSize: 14 }}>
            {formatCurrency(product.price * quantity)}
          </Text>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <InputNumber
              min={1}
              max={product.stock || 99}
              value={quantity}
              size="small"
              onChange={(val) => onQuantityChange(product.id, val)}
              style={{ width: 64 }}
            />
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(product.id)}
              style={{ padding: "0 4px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    const stored = getCartFromSession();
    if (!stored.length) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const results = await Promise.allSettled(
        stored.map((entry) => fetchProductById(entry.id))
      );

      const merged = stored.reduce((acc, entry, idx) => {
        const result = results[idx];
        if (result.status === "fulfilled") {
          acc.push({ product: result.value, quantity: entry.quantity });
        }
        return acc;
      }, []);

      setCartItems(merged);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) loadCart();
  }, [open, loadCart]);

  const handleQuantityChange = (productId, newQty) => {
    if (!newQty || newQty < 1) return;
    const stored = getCartFromSession();
    const updated = stored.map((item) =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    saveCartToSession(updated);
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (productId) => {
    const stored = getCartFromSession().filter((item) => item.id !== productId);
    saveCartToSession(stored);
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleClearAll = () => {
    saveCartToSession([]);
    setCartItems([]);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const subtotal = cartItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <Drawer
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ShoppingCartOutlined style={{ color: "var(--primary-main, #e53935)", fontSize: 18 }} />
          <span style={{ fontSize: 16, fontWeight: 700 }}>
            Giỏ hàng
            {totalItems > 0 && (
              <span
                style={{
                  marginLeft: 8,
                  background: "var(--primary-main, #e53935)",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "1px 8px",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {totalItems}
              </span>
            )}
          </span>
        </div>
      }
      placement="right"
      open={open}
      onClose={onClose}
      width={420}
      footer={
        cartItems.length > 0 ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <Text type="secondary">Tạm tính ({totalItems} sản phẩm)</Text>
              <Text strong style={{ fontSize: 15 }}>{formatCurrency(subtotal)}</Text>
            </div>
            <Divider style={{ margin: "10px 0" }} />
            <Button
              type="primary"
              block
              size="large"
              icon={<ThunderboltOutlined />}
              onClick={handleCheckout}
              style={{
                height: 48,
                borderRadius: 10,
                background: "var(--primary-main, #e53935)",
                borderColor: "var(--primary-main, #e53935)",
                fontWeight: 700,
                fontSize: 15,
                boxShadow: "0 4px 12px rgba(229,57,53,0.35)",
              }}
            >
              Tiến hành thanh toán
            </Button>
          </div>
        ) : null
      }
      styles={{
        body: { padding: "0 20px", overflowY: "auto" },
        footer: { padding: "16px 20px", borderTop: "1px solid var(--neutral-200, #e0e0e0)" },
      }}
    >
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
          <Spin tip="Đang tải giỏ hàng..." />
        </div>
      ) : cartItems.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, gap: 12 }}>
          <Empty
            image={<ShoppingCartOutlined style={{ fontSize: 64, color: "var(--neutral-300, #bdbdbd)" }} />}
            imageStyle={{ height: 72 }}
            description={
              <Text type="secondary" style={{ fontSize: 14 }}>
                Giỏ hàng trống
              </Text>
            }
          />
          <Button onClick={onClose} style={{ borderRadius: 8 }}>
            Tiếp tục mua sắm
          </Button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 0 0" }}>
            <Button type="link" danger size="small" onClick={handleClearAll} style={{ padding: 0, fontSize: 12 }}>
              Xóa tất cả
            </Button>
          </div>

          {cartItems.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              item={{ product, quantity }}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}

          <div style={{ height: 16 }} />
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
