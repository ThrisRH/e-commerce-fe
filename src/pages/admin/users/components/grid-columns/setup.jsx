import { Space, Tag, Modal, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getUserColumns = (onDelete) => {
  return [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên người dùng", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "roles",
      headerName: "Quyền",
      width: 150,
      renderCell: (params) => {
        const roles = params.row.roles || [];
        return (
          <Space>
            {roles.map((role) => (
              <Tag
                color={
                  role === "admin"
                    ? "volcano"
                    : role === "staff"
                      ? "blue"
                      : "default"
                }
                key={role}
              >
                {role.toUpperCase()}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 120,
      renderCell: (params) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#1890ff" }} />}
            onClick={() => {}}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
            onClick={() => {
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
