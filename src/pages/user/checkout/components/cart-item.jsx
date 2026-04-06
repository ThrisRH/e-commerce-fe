import React from "react";
import { Typography, Tag } from "antd";
import { formatCurrency } from "@/components/utils/format-currency";

const { Text } = Typography;

const CartItem = ({ item }) => {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid var(--neutral-100)",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid var(--neutral-200)",
          flexShrink: 0,
          background: "var(--neutral-50)",
        }}
      >
        <img
          src={
            product.image_url || "https://via.placeholder.com/72x72?text=IMG"
          }
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          strong
          style={{
            display: "block",
            fontSize: 13,
            lineHeight: 1.4,
            marginBottom: 4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </Text>
        {product.category?.name && (
          <Tag
            color="default"
            style={{ fontSize: 11, marginBottom: 6, borderRadius: 4 }}
          >
            {product.category.name}
          </Tag>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            x{quantity}
          </Text>
          <Text strong style={{ color: "var(--primary-main)", fontSize: 14 }}>
            {formatCurrency(subtotal)}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
