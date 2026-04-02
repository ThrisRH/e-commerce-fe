import React from "react";
import { Typography, Button, Avatar } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "../../components/utils/format-currency";

const { Text } = Typography;

const PartPicker = ({ category, title, selected, onPick, onRemove }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "16px 24px",
        borderRadius: 12,
        marginBottom: 16,
        border: "1px solid var(--neutral-200)",
        transition: "all 0.3s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      }}
    >
      {/* Category Icon/Title Area */}
      <div style={{ width: 180, flexShrink: 0 }}>
        <div
          style={{ fontSize: 15, fontWeight: 700, color: "var(--neutral-900)" }}
        >
          {title}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {selected ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
            }}
          >
            <Avatar
              src={selected.image_url}
              shape="square"
              size={56}
              style={{
                background: "#fff",
                border: "1px solid var(--neutral-100)",
              }}
            />
            <div style={{ flexGrow: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "var(--neutral-900)",
                }}
              >
                {selected.name}
              </div>
              <div style={{ fontSize: 13, color: "var(--neutral-500)" }}>
                {selected.specs || selected.brandName || selected.brand?.name}
              </div>
            </div>
            <div style={{ textAlign: "right", marginRight: 16 }}>
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--primary-main)",
                  fontSize: 16,
                }}
              >
                {formatCurrency(selected.price)}
              </div>
            </div>
          </div>
        ) : (
          <Text type="secondary" italic style={{ fontSize: 14 }}>
            Chưa có linh kiện nào được chọn cho mục này.
          </Text>
        )}
      </div>

      {/* Action Area */}
      <div
        style={{
          width: 150,
          textAlign: "right",
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
        }}
      >
        {selected ? (
          <>
            <Button
              icon={<SwapOutlined />}
              onClick={onPick}
              type="text"
              style={{ color: "var(--primary-main)", fontWeight: 600 }}
            >
              Thay đổi
            </Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={onRemove}
              danger
              type="text"
            />
          </>
        ) : (
          <Button
            type="primary"
            ghost
            icon={<PlusCircleOutlined />}
            onClick={onPick}
            style={{
              borderRadius: 8,
              height: 40,
              borderColor: "var(--primary-main)",
              color: "var(--primary-main)",
              padding: "0 20px",
            }}
          >
            Chọn linh kiện
          </Button>
        )}
      </div>
    </div>
  );
};

export default PartPicker;
