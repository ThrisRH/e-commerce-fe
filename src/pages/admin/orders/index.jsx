import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Typography, Space, Card, Input } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import { getOrderColumns } from "./sections/grid-columns/setup";
import Order from "@/models/order";
import { fetchOrders, updateOrder, trackOrder } from "@/api/orders/order-api";
import { enqueueSnackbar } from "notistack";
import { Meta } from "@/models/meta";

const { Title } = Typography;
const { Search } = Input;

const OrdersManagement = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(new Meta());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [searchPhone, setSearchPhone] = useState("");

  const loadOrders = useCallback(() => {
    setIsLoading(true);
    const fetchFunc = searchPhone
      ? trackOrder(searchPhone)
      : fetchOrders(paginationModel.page + 1, paginationModel.pageSize);

    fetchFunc
      .then((data) => {
        if (searchPhone) {
          const resultData = Array.isArray(data) ? data : data.data || [];
          setOrders(resultData);
          setMeta(new Meta({ total: resultData.length }));
        } else {
          setOrders(data.data);
          setMeta(data.meta);
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationModel, searchPhone]);

  const handleUpdateStatus = async (id, data) => {
    try {
      await updateOrder(id, data);
      enqueueSnackbar("Cập nhật trạng thái thành công!", {
        variant: "success",
      });
      loadOrders();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleSearch = (value) => {
    setSearchPhone(value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Breadcrumb
            items={[{ title: "Admin" }, { title: "Quản Lý Đơn Hàng" }]}
          />
          <Title level={2} style={{ margin: "8px 0 0" }}>
            Quản Lý Đơn Hàng
          </Title>
        </div>
        <Search
          placeholder="Tìm đơn hàng theo số điện thoại..."
          onSearch={handleSearch}
          allowClear
          enterButton
          size="large"
          style={{ width: 400 }}
        />
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
          columns={getOrderColumns(handleUpdateStatus)}
          loading={isLoading}
          onRowClick={(params) => navigate(`/admin/orders/${params.row.id}`)}
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
          rowCount={meta.total}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode={searchPhone ? "client" : "server"}
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
