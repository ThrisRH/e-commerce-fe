import React from "react";
import {
  Typography,
  Result,
  Button,
  Card,
  Row,
  Col,
  Tag,
  Divider,
  Space,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/format-currency";

const { Title, Text } = Typography;

const PAYMENT_METHODS = [
  {
    value: "cod",
    label: "Thanh toán khi nhận hàng (COD)",
  },
  {
    value: "bank_transfer",
    label: "Chuyển khoản ngân hàng",
  },
];

const SuccessInvoice = ({ order, items, total, subtotal, shippingFee }) => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
      <Result
        status="success"
        title={
          <Title level={2} style={{ color: "#52c41a", marginBottom: 0 }}>
            Đặt hàng thành công!
          </Title>
        }
        subTitle={
          <div style={{ marginTop: 8 }}>
            <Text type="secondary">
              Cảm ơn bạn đã tin tưởng mua sắm tại GALAXY STORE.
            </Text>
          </div>
        }
        extra={[
          <Button
            type="primary"
            key="home"
            size="large"
            onClick={() => navigate("/")}
            style={{ borderRadius: 8, height: 45, padding: "0 32px" }}
          >
            Tiếp tục mua sắm
          </Button>,
        ]}
      />

      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          border: "none",
          marginTop: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "var(--primary-50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-main)",
              fontSize: 20,
            }}
          >
            <FileTextOutlined />
          </div>
          <Title level={4} style={{ margin: 0 }}>
            Thông tin hóa đơn
          </Title>
        </div>

        <Row gutter={[32, 24]}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 20 }}>
              <Text type="secondary" style={{ fontSize: 13, display: "block" }}>
                Người nhận
              </Text>
              <Text strong style={{ fontSize: 15 }}>
                {order.shipping_name}
              </Text>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Text type="secondary" style={{ fontSize: 13, display: "block" }}>
                Số điện thoại
              </Text>
              <Text strong style={{ fontSize: 15 }}>
                {order.shipping_phone}
              </Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 20 }}>
              <Text type="secondary" style={{ fontSize: 13, display: "block" }}>
                Địa chỉ nhận hàng
              </Text>
              <Text strong style={{ fontSize: 15 }}>
                {order.shipping_address}
              </Text>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Text type="secondary" style={{ fontSize: 13, display: "block" }}>
                Phương thức thanh toán
              </Text>
              <Tag color="blue" style={{ marginTop: 4, borderRadius: 4 }}>
                {PAYMENT_METHODS.find((m) => m.value === order.payment_method)
                  ?.label || "Thanh toán khi nhận hàng"}
              </Tag>
            </div>
          </Col>
        </Row>

        <Divider style={{ margin: "12px 0 24px" }} />

        <Title level={5} style={{ marginBottom: 16 }}>
          Sản phẩm đã mua
        </Title>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Space size={12}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <img
                    src={item.product.image_url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <Text style={{ fontSize: 14 }}>{item.product.name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    x{item.quantity}
                  </Text>
                </div>
              </Space>
              <Text strong style={{ fontSize: 14 }}>
                {formatCurrency(item.product.price * item.quantity)}
              </Text>
            </div>
          ))}
        </div>

        <Divider style={{ margin: "24px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text type="secondary">Tạm tính</Text>
            <Text>{formatCurrency(subtotal)}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text type="secondary">Phí vận chuyển</Text>
            <Text>{formatCurrency(shippingFee)}</Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              paddingTop: 16,
              borderTop: "2px solid #f0f0f0",
            }}
          >
            <Text strong style={{ fontSize: 18 }}>
              Tổng thanh toán
            </Text>
            <Text strong style={{ fontSize: 24, color: "var(--primary-main)" }}>
              {formatCurrency(total)}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SuccessInvoice;
