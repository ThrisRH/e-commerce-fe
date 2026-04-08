import { Card, Table, Tag, Typography } from "antd";
import { formatCurrency } from "@/utils/format-currency";

const { Text } = Typography;

const columns = [
  {
    title: "Mã Đơn Hàng",
    dataIndex: "id",
    key: "id",
    render: (text) => <Text strong>{text}</Text>,
  },
  {
    title: "Khách Hàng",
    dataIndex: "shipping_name",
    key: "shipping_name",
  },
  {
    title: "Số điện thoại",
    dataIndex: "shipping_phone",
    key: "shipping_phone",
  },
  {
    title: "Địa chỉ",
    dataIndex: "shipping_address",
    key: "shipping_address",
  },
  {
    title: "Tổng Tiền",
    dataIndex: "total",
    key: "total",
    render: (value) => (
      <Text style={{ color: "var(--primary-main)", fontWeight: 600 }}>
        {formatCurrency(value)}
      </Text>
    ),
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color = "default";
      let text = status;
      if (status === "pending") {
        color = "yellow";
        text = "Chờ xử lý";
      }
      if (status === "delivered") {
        color = "green";
        text = "Đã giao hàng";
      }
      if (status === "shipping") {
        color = "indigo";
        text = "Đang giao";
      }
      if (status === "cancelled") {
        color = "red";
        text = "Đã hủy";
      }
      if (status === "confirmed") {
        color = "blue";
        text = "Đã xác nhận";
      }
      return <Tag color={color}>{text.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Thời Gian",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => (
      <Text type="secondary">{new Date(date).toLocaleString()}</Text>
    ),
  },
];

const RecentOrders = ({ orders = [], loading }) => {
  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Đơn hàng mới nhất</span>
          <a href="/admin/orders" style={{ fontSize: 13 }}>
            Xem tất cả
          </a>
        </div>
      }
      bordered={false}
      className="shadow-sm"
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: "0 12px 12px" }}
    >
      <Table
        columns={columns}
        dataSource={orders}
        pagination={false}
        size="middle"
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default RecentOrders;
