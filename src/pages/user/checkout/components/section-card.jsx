import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const SectionCard = ({ title, icon, children }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 12,
      border: "1px solid var(--neutral-200)",
      overflow: "hidden",
      marginBottom: 16,
    }}
  >
    <div
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid var(--neutral-200)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "var(--neutral-50)",
      }}
    >
      <span style={{ color: "var(--primary-main)", fontSize: 16 }}>{icon}</span>
      <Text strong style={{ fontSize: 15 }}>
        {title}
      </Text>
    </div>
    <div style={{ padding: "20px" }}>{children}</div>
  </div>
);

export default SectionCard;
