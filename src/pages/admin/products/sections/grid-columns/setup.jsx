import React from "react";
import { Space, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { formatCurrency } from "@/utils/format-currency";

export const getProductColumns = (handleDelete) => [
  { field: "name", headerName: "Tên sản phẩm", width: 300 },
  {
    field: "price",
    headerName: "Giá",
    width: 200,
    valueGetter: (value, row) => {
      if (row.price_min && row.price_max && row.price_min !== row.price_max) {
        return `${formatCurrency(row.price_min)} - ${formatCurrency(row.price_max)}`;
      }
      return formatCurrency(row.price_min || row.price || 0);
    },
  },
  {
    field: "category",
    headerName: "Danh mục",
    width: 120,
    valueGetter: (value, row) => row?.category?.name || "",
  },
  {
    field: "brand",
    headerName: "Thương hiệu",
    width: 120,
    valueGetter: (value, row) => row?.brand?.name || "",
  },
  {
    field: "is_active",
    headerName: "Trạng thái",
    width: 100,
    valueGetter: (value, row) =>
      row?.is_active == 1 ? "Đang bán" : "Ngừng bán",
  },

  { field: "created_at", headerName: "Ngày tạo", width: 150 },
  { field: "updated_at", headerName: "Ngày cập nhật", width: 150 },
  {
    field: "actions",
    headerName: "Thao tác",
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
];
