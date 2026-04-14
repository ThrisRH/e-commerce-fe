import React from "react";
import { Typography, Divider, Space, Tooltip, Tag, Button } from "antd";
import {
  ShoppingOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import SectionCard from "./section-card";
import CartItem from "./cart-item";
import { formatCurrency } from "@/utils/format-currency";

const { Title, Text } = Typography;

const CheckoutSummary = ({
  items,
  subtotal,
  total,
  shippingFee,
  submitting,
  handleSubmit,
}) => {
  return (
    <>
      <SectionCard
        title={`Sản phẩm đã chọn (${items.length})`}
        icon={<ShoppingOutlined />}
      >
        <div>
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
      </SectionCard>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid var(--neutral-200)",
          overflow: "hidden",
          position: "sticky",
          top: 80,
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--neutral-200)",
            background: "var(--neutral-50)",
          }}
        >
          <Text strong style={{ fontSize: 15 }}>
            Chi tiết thanh toán
          </Text>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text type="secondary">Tạm tính</Text>
              <Text>{formatCurrency(subtotal)}</Text>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Space>
                <Text type="secondary">Phí vận chuyển</Text>
                <Tooltip
                  title={
                    <div>
                      <p style={{ margin: 0 }}>• Phí vận chuyển được tính tự động dựa trên:</p>
                      <p style={{ margin: 0 }}>  - Khoảng cách từ kho đến điểm giao</p>
                      <p style={{ margin: 0 }}>  - Thời gian vận chuyển dự kiến</p>
                      <p style={{ margin: 0 }}>  - Loại hàng hóa và khu vực giao hàng</p>
                    </div>
                  }
                >
                  <InfoCircleOutlined
                    style={{
                      fontSize: 12,
                      color: "var(--neutral-400)",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Space>
              <Text>
                {shippingFee === 0 ? (
                  <Tag color="success" style={{ margin: 0 }}>
                    Miễn phí
                  </Tag>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </Text>
            </div>
          </div>

          <Divider style={{ margin: "16px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text strong style={{ fontSize: 16 }}>
              Tổng cộng
            </Text>
            <Title
              level={3}
              style={{ margin: 0, color: "var(--primary-main)" }}
            >
              {formatCurrency(total)}
            </Title>
          </div>

          <Text
            type="secondary"
            style={{ fontSize: 11, display: "block", marginBottom: 14 }}
          >
            Giá đã bao gồm VAT. Bằng cách đặt hàng, bạn đồng ý với{" "}
            <a href="#" style={{ color: "var(--primary-main)" }}>
              điều khoản dịch vụ
            </a>{" "}
            của chúng tôi.
          </Text>

          <Button
            type="primary"
            size="large"
            block
            loading={submitting}
            onClick={handleSubmit}
            style={{
              height: 50,
              borderRadius: 10,
              background: "var(--primary-main)",
              borderColor: "var(--primary-main)",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 4px 14px rgba(229,57,53,0.4)",
              letterSpacing: 0.3,
            }}
          >
            Đặt hàng ngay
          </Button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            <Space style={{ fontSize: 12, color: "var(--neutral-500)" }}>
              <SafetyCertificateOutlined />
              Bảo mật SSL
            </Space>
            <Space style={{ fontSize: 12, color: "var(--neutral-500)" }}>
              <TruckOutlined />
              Giao hàng toàn quốc
            </Space>
            <Space style={{ fontSize: 12, color: "var(--neutral-500)" }}>
              <WalletOutlined />
              Thanh toán an toàn
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
