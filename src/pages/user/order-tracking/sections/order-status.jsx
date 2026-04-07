import React from "react";
import { Typography, Steps, Tag } from "antd";
import {
  ShoppingOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const OrderStatus = ({ order, statusMap }) => {
  const currentStatus = statusMap[order.status] || statusMap.pending;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div>
          <Title level={4} style={{ margin: "4px 0" }}>
            Trạng thái đơn hàng
          </Title>
          <Text type="secondary">
            Ngày đặt: {new Date(order.created_at).toLocaleDateString("vi-VN")}
          </Text>
        </div>
        <div style={{ textAlign: "right" }}>
          <Tag
            color={currentStatus.color}
            style={{ fontSize: 14, padding: "4px 12px", borderRadius: 4 }}
          >
            {currentStatus.title}
          </Tag>
          {order.tracking_code && (
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Mã vận đơn:{" "}
              </Text>
              <Text strong>{order.tracking_code}</Text>
            </div>
          )}
        </div>
      </div>

      {order.status !== "cancelled" && (
        <div style={{ padding: "20px 0 40px" }}>
          <Steps
            current={currentStatus.step}
            items={[
              { title: "Chờ xử lý", icon: <ShoppingOutlined /> },
              { title: "Đã xác nhận", icon: <CheckCircleOutlined /> },
              { title: "Đang giao", icon: <TruckOutlined /> },
              { title: "Hoàn tất", icon: <HomeOutlined /> },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default OrderStatus;
