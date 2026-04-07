import { Space, Tag, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getRoleColumns = (onDelete) => {
  return [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Mã vai trò", width: 150 },
    { field: "display_name", headerName: "Tên vai trò", flex: 1 },
    { field: "description", headerName: "Mô tả", flex: 1 },
    { field: "guard_name", headerName: "Guard", width: 100 },

    {
      field: "actions",
      headerName: "Thao tác",
      width: 120,
      renderCell: (params) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
            onClick={(e) => {
              e.stopPropagation();
              Modal.confirm({
                title: "Bạn có chắc chắn muốn xóa?",
                content: `Xóa người dùng ${params.row.name}`,
                okText: "Xóa",
                cancelText: "Hủy",
                onOk: () => onDelete(params.row.id),
                okButtonProps: { danger: true },
              });
            }}
          />
        </Space>
      ),
    },
  ];
};
