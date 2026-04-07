import React from "react";
import { Row, Col, Card, Space, Typography } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const DashboardStat = ({ title, value, icon, suffix = "" }) => (
  <Card bordered={false} className="dashboard-card shadow-sm">
    <Space direction="vertical" style={{ width: "100%" }} size={8}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#e1e1e18f",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </div>
          <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
            {title}
          </Text>
        </Space>
      </div>
      <div>
        <Text strong style={{ fontSize: 24 }}>
          {value}
          {suffix}
        </Text>
      </div>
    </Space>
  </Card>
);

const StatsCards = ({ orders = [], customers = [], orderItems = [] }) => {
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total_amount || 0),
    0,
  );
  const totalOrders = orders.length;
  const totalCustomers = customers.length;

  return (
    <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <DashboardStat
          icon={<DollarOutlined />}
          title="Tổng doanh thu"
          value={totalRevenue.toLocaleString()}
          suffix="₫"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <DashboardStat
          icon={<ShoppingOutlined />}
          title="Tổng đơn hàng"
          value={totalOrders}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <DashboardStat
          icon={<UserOutlined />}
          title="Khách hàng"
          value={totalCustomers}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <DashboardStat
          icon={<ShopOutlined />}
          title="Sản phẩm đã bán"
          value={orderItems.length}
        />
      </Col>
    </Row>
  );
};

export default StatsCards;
