import React from "react";

const PolicyBadge = ({ icon, title, subtitle }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 16px",
      background: "var(--neutral-50)",
      borderRadius: 8,
      border: "1px solid var(--neutral-200)",
      flex: 1,
      minWidth: 140,
    }}
  >
    <span style={{ fontSize: 22, color: "var(--primary-main)" }}>{icon}</span>
    <div>
      <div
        style={{ fontWeight: 600, fontSize: 12, color: "var(--neutral-800)" }}
      >
        {title}
      </div>
      <div style={{ fontSize: 11, color: "var(--neutral-500)" }}>
        {subtitle}
      </div>
    </div>
  </div>
);

export default PolicyBadge;
