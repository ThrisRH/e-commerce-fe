import React from "react";
import { Dropdown, Button, Modal } from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";

/**
 * ActionMenu Component for DataGrid tables
 */
const ActionMenu = ({
  onView = null,
  onEdit = null,
  onDelete = null,
  deleteTitle = "",
  deleteContent = "",
}) => {
  const items = [
    onView && {
      key: "view",
      label: "Xem chi tiết",
      icon: <EyeOutlined />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onView();
      },
    },
    onEdit && {
      key: "edit",
      label: "Chỉnh sửa",
      icon: <EditOutlined />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onEdit();
      },
    },
    onDelete && {
      key: "delete",
      label: "Xóa",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        Modal.confirm({
          title: deleteTitle || "Bạn có chắc chắn muốn xóa?",
          content: deleteContent || "Hành động này không thể hoàn tác.",
          okText: "Xóa",
          cancelText: "Hủy",
          okButtonProps: { danger: true },
          onOk: () => onDelete(),
          // Ensure clicking outside confirm doesn't trigger row click
          maskClosable: true,
        });
      },
    },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Button
          type="text"
          icon={<MoreOutlined style={{ fontSize: 18 }} />}
          className="action-menu-btn"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
          }}
        />
      </Dropdown>
    </div>
  );
};

export default ActionMenu;
