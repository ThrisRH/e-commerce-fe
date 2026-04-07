import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { fetchOrderItems, fetchOrders } from "@/api/orders/order-api";
import { fetchCustomers } from "@/api/users/user-api";

import StatsCards from "./sections/stats-cards";
import RevenueChart from "./sections/revenue-chart";
import OrderStatusChart from "./sections/order-status-chart";
import RecentOrders from "./sections/recent-orders";
import NewCustomers from "./sections/new-customers";
import Order from "@/models/order";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, itemsRes, customersRes] = await Promise.all([
          fetchOrders(1, 50),
          fetchOrderItems(),
          fetchCustomers(1, 10),
        ]);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setOrderItems(Array.isArray(itemsRes.data) ? itemsRes.data : []);
        setCustomers(Array.isArray(customersRes.data) ? customersRes.data : []);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={4}>Tổng quan hệ thống</Title>
        <Text type="secondary">
          Chào mừng quay trở lại, đây là thống kê mới nhất của cửa hàng.
        </Text>
      </div>

      <StatsCards
        orders={orders}
        customers={customers}
        orderItems={orderItems}
      />

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <RevenueChart loading={loading} />
        </Col>

        <Col xs={24} lg={8}>
          <OrderStatusChart orders={orders} loading={loading} />
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={17}>
          <RecentOrders orders={orders.slice(0, 5)} loading={loading} />
        </Col>

        <Col xs={24} lg={7}>
          <NewCustomers customers={customers} loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
