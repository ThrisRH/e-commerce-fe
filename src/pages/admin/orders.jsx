import React from "react";
import { Breadcrumb, Typography, Space, Card, Empty } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title } = Typography;

const OrdersManagement = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <div>
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Quản Lý Đơn Hàng" }]}
        />
        <Title level={2} style={{ margin: "8px 0 0" }}>
          Quản Lý Đơn Hàng
        </Title>
      </div>

      <Card
        style={{
          borderRadius: 12,
          padding: 64,
          textAlign: "center",
          border: "2px dashed #f0f0f0",
          backgroundColor: "#fafafa",
        }}
      >
        <Empty
          image={
            <ShoppingCartOutlined style={{ fontSize: 64, color: "#bfbfbf" }} />
          }
          description={
            <Typography.Text type="secondary" style={{ fontSize: 18 }}>
              Chức năng quản lý đơn hàng sẽ sớm ra mắt.
            </Typography.Text>
          }
        />
      </Card>
    </Space>
  );
};

export default OrdersManagement;
