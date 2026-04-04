import React from "react";
import { Breadcrumb, Typography, Space, Card, Empty } from "antd";

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
          borderRadius: 8,
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* <DataGrid */}
      </Card>
    </Space>
  );
};

export default OrdersManagement;
