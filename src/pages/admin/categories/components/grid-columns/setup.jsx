import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";

export const getCategoryColumns = (handleDelete) => [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "slug", headerName: "Slug", width: 250 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "parent_category",
    headerName: "Parent",
    width: 200,
    valueGetter: (value, row) => row?.parent_category?.name || "N/A",
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 120,
    valueGetter: (value, row) => (row?.is_active == 1 ? "Bật" : "Tắt"),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Space size="middle" onClick={(e) => e.stopPropagation()}>
        <Popconfirm
          title="Xóa danh mục"
          description="Bạn có chắc chắn muốn xóa danh mục này không? Các sản phẩm trong danh mục này có thể bị ảnh hưởng."
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
