import React from "react";
import { Card, Space, Divider, Typography } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const { Text } = Typography;

const OrderStatusChart = ({ orders = [], loading }) => {
  const getStatusData = () => {
    const counts = {
      completed: 0,
      shipping: 0,
      pending: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      if (counts[order.status] !== undefined) {
        counts[order.status]++;
      }
    });

    const total = orders.length || 1;

    return [
      { name: "Hoàn thành", value: counts.completed, percentage: Math.round((counts.completed / total) * 100), color: "#52c41a" },
      { name: "Đang giao", value: counts.shipping, percentage: Math.round((counts.shipping / total) * 100), color: "#1890ff" },
      { name: "Chờ xử lý", value: counts.pending, percentage: Math.round((counts.pending / total) * 100), color: "#faad14" },
      { name: "Đã hủy", value: counts.cancelled, percentage: Math.round((counts.cancelled / total) * 100), color: "#ff4d4f" },
    ];
  };

  const statusData = getStatusData();

  return (
    <Card 
      title={
        <Space>
          <div style={{ width: 8, height: 24, borderRadius: 4, background: "#faad14" }} />
          <span>Trạng thái đơn hàng</span>
        </Space>
      }
      bordered={false}
      className="shadow-sm"
      style={{ borderRadius: 12, height: "100%" }}
      loading={loading}
    >
      <div style={{ height: 300, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {statusData.map(item => (
          <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
              <Text>{item.name}</Text>
            </Space>
            <Text strong>{item.percentage}%</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OrderStatusChart;
