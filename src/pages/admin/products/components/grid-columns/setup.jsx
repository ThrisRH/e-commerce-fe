import React from "react";
import { Space, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { formatCurrency } from "@/components/utils/format-currency";

export const getProductColumns = (handleDelete) => [
  { field: "name", headerName: "Name", width: 300 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    valueGetter: (value, row) => formatCurrency(row?.price),
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 120,
    valueGetter: (value, row) => row?.category?.name || "",
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 120,
    valueGetter: (value, row) => row?.brand?.name || "",
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 100,
    valueGetter: (value, row) =>
      row?.is_active == 1 ? "Selling" : "Stop Selling",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Space size="middle" onClick={(e) => e.stopPropagation()}>
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
          onConfirm={() => handleDelete(params.row.id)}
          okText="Yes"
          cancelText="No"
          placement="leftTop"
        >
          <Button danger icon={<DeleteOutlined />} type="text" size="small" />
        </Popconfirm>
      </Space>
    ),
  },
  { field: "created_at", headerName: "Created At", width: 150 },
  { field: "updated_at", headerName: "Updated At", width: 150 },
];
