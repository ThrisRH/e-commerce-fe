import React from "react";
import { Row, Col, Typography, Space, Tag } from "antd";

const { Title, Text } = Typography;

const ReceiverInfo = ({ order }) => {
  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} md={12}>
        <Title level={5}>Thông tin người nhận</Title>
        <Space direction="vertical" size={4} style={{ width: "100%" }}>
          <div>
            <Text type="secondary">Họ tên: </Text>
            <Text strong>{order.shipping_name}</Text>
          </div>
          <div>
            <Text type="secondary">Số điện thoại: </Text>
            <Text strong>{order.shipping_phone}</Text>
          </div>
          <div>
            <Text type="secondary">Địa chỉ: </Text>
            <Text strong>{order.shipping_address}</Text>
          </div>
        </Space>
      </Col>
      <Col xs={24} md={12}>
        <Title level={5}>Thanh toán</Title>
        <Space direction="vertical" size={4} style={{ width: "100%" }}>
          <div>
            <Text type="secondary">Phương thức: </Text>
            <Text strong>
              {order.payment_method === "cod" ? "COD" : "Chuyển khoản"}
            </Text>
          </div>
          <div>
            <Text type="secondary">Trạng thái: </Text>
            <Tag color={order.payment_status === "paid" ? "green" : "orange"}>
              {order.payment_status === "paid"
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
            </Tag>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default ReceiverInfo;
