import { Space, Tag, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getUserColumns = (onDelete) => {
  return [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên người dùng", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },

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
