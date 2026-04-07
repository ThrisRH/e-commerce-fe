import React from "react";
import { Typography, Table, Space } from "antd";
import { formatCurrency } from "@/utils/format-currency";

const { Title, Text } = Typography;

const ProductDetails = ({ order }) => {
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product_name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={record.product_image}
            alt={text}
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (val) => formatCurrency(val),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: (val) => <Text strong>{formatCurrency(val)}</Text>,
    },
  ];

  return (
    <>
      <Title level={5} style={{ marginBottom: 16 }}>
        Chi tiết sản phẩm
      </Title>
      <Table
        dataSource={order.items}
        // @ts-ignore
        columns={columns}
        pagination={false}
        rowKey="id"
        size="small"
      />

      <div style={{ marginTop: 24, textAlign: "right", padding: "0 16px" }}>
        <Space direction="vertical" align="end">
          <div>
            <Text type="secondary">Tạm tính: </Text>
            <Text>
              {formatCurrency(order.total_amount - order.shipping_fee)}
            </Text>
          </div>
          <div>
            <Text type="secondary">Phí vận chuyển: </Text>
            <Text>{formatCurrency(order.shipping_fee)}</Text>
          </div>
          <div>
            <Text strong style={{ fontSize: 18 }}>
              Tổng thanh toán:{" "}
            </Text>
            <Text
              strong
              style={{ fontSize: 22, color: "var(--primary-main)" }}
            >
              {formatCurrency(order.total_amount)}
            </Text>
          </div>
        </Space>
      </div>
    </>
  );
};

export default ProductDetails;
