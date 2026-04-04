import React, { useEffect, useState } from "react";
import { Breadcrumb, Typography, Space, Card, Empty } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import { getOrderColumns } from "./components/grid-columns/setup";
import Order from "@/models/order";
import { fetchOrders } from "@/api/orders/order-api";
import { enqueueSnackbar } from "notistack";
import { Meta } from "@/models/MetaData/meta";

const { Title } = Typography;

const OrdersManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  /** @type {[Order[] | [], function]} */
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(new Meta());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const loadOrders = () => {
    setIsLoading(true);
    fetchOrders(paginationModel.page + 1, paginationModel.pageSize)
      .then((data) => {
        setOrders(data.data);
        setMeta(data.meta);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadOrders();
  }, [paginationModel]);

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
        <DataGrid
          rows={orders}
          columns={getOrderColumns()}
          loading={isLoading}
          rowCount={meta.total}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      </Card>
    </Space>
  );
};

export default OrdersManagement;
