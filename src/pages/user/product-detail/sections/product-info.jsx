import React from "react";
import { Typography, Tag, Rate, Divider, InputNumber, Button } from "antd";
import {
  ThunderboltOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "@/utils/format-currency";
import BorderButton from "@/components/common/buttons/border-button";
import PolicyBadge from "./policy-badge";

const { Title, Text } = Typography;

const ProductInfo = ({
  product,
  avgRating,
  mockReviewsCount,
  quantity,
  setQuantity,
  handleBuyNow,
  handleAddToCart,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {product.brand?.name && (
          <Tag color="blue" style={{ borderRadius: 4 }}>
            {product.brand.name}
          </Tag>
        )}
        {product.category?.name && (
          <Tag color="default" style={{ borderRadius: 4 }}>
            {product.category.name}
          </Tag>
        )}
        {product.is_active ? (
          <Tag color="success">Còn hàng ({product.stock})</Tag>
        ) : (
          <Tag color="error">Hết hàng</Tag>
        )}
      </div>

      <Title level={3} style={{ margin: 0 }}>
        {product.name}
      </Title>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Rate value={avgRating} allowHalf disabled style={{ fontSize: 14 }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          {avgRating}/5 · {mockReviewsCount} đánh giá
        </Text>
      </div>

      <Title level={2} style={{ color: "var(--primary-main)", margin: 0 }}>
        {formatCurrency(product.price)}
      </Title>
      <Text style={{ fontSize: 12, color: "var(--neutral-600)" }}>
        Giá đã bao gồm VAT
      </Text>

      <Divider style={{ margin: "4px 0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Text style={{ fontWeight: 500 }}>Số lượng:</Text>
        <InputNumber
          min={1}
          max={product.stock || 99}
          value={quantity}
          onChange={(val) => setQuantity(val)}
          style={{ width: 100 }}
        />
        <Text type="secondary" style={{ fontSize: 12 }}>
          ({product.stock || 0} sản phẩm có sẵn)
        </Text>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button
          type="primary"
          size="large"
          icon={<ThunderboltOutlined />}
          onClick={handleBuyNow}
          style={{
            flex: 1,
            minWidth: 140,
            height: 48,
            background: "var(--primary-main)",
            borderColor: "var(--primary-main)",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(229,57,53,0.4)",
          }}
        >
          Mua ngay
        </Button>
        <BorderButton
          label={"Thêm vào giỏ hàng"}
          onClick={(e) => handleAddToCart(e, product, quantity)}
        />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <PolicyBadge
          icon={<TruckOutlined />}
          title="Miễn phí vận chuyển"
          subtitle="Đơn từ 4.000.000đ"
        />
        <PolicyBadge
          icon={<SafetyCertificateOutlined />}
          title="Bảo hành chính hãng"
          subtitle="12 tháng"
        />
        <PolicyBadge
          icon={<ReloadOutlined />}
          title="Đổi trả miễn phí"
          subtitle="Trong 30 ngày"
        />
      </div>
    </div>
  );
};

export default ProductInfo;
