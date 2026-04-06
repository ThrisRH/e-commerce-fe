import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";

export const getCategoryColumns = (handleDelete) => [
  { field: "name", headerName: "Tên danh mục", width: 250 },
  { field: "slug", headerName: "Đường dẫn", width: 250 },
  { field: "description", headerName: "Mô tả", width: 300 },
  {
    field: "parent_category",
    headerName: "Danh mục cha",
    width: 200,
    valueGetter: (value, row) => row?.parent_category?.name || "N/A",
  },
  {
    field: "is_active",
    headerName: "Trạng thái",
    width: 120,
    valueGetter: (value, row) => (row?.is_active == 1 ? "Bật" : "Tắt"),
  },
  {
    field: "actions",
    headerName: "Thao tác",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Space size="middle" onClick={(e) => e.stopPropagation()}>
        <Popconfirm
          title="Xóa danh mục"
          description="Bạn có chắc chắn muốn xóa danh mục này không? Các sản phẩm trong danh mục này có thể bị ảnh hưởng."
          onConfirm={() => handleDelete(params.row.id)}
          okText="Có"
          cancelText="Không"
          placement="leftTop"
        >
          <Button danger icon={<DeleteOutlined />} type="text" size="small" />
        </Popconfirm>
      </Space>
    ),
  },
];
