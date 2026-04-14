import React from "react";
import { Typography } from "antd";
import RateRow from "./rate-row";

const { Text } = Typography;

const ZoneGroup = ({ zoneName, rates, onEdit }) => (
  <div
    style={{
      marginBottom: 16,
      borderRadius: 10,
      overflow: "hidden",
      border: "1px solid #e5e7eb",
    }}
  >
    <div
      style={{
        padding: "10px 16px",
        background: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontWeight: 700, fontSize: 14 }}>{zoneName}</Text>
      <Text style={{ fontSize: 12, color: "#9ca3af" }}>
        {rates.length} phương thức
      </Text>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr 1fr 1fr 1fr 1fr 1fr 80px",
        gap: 4,
        padding: "8px 16px",
        background: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {[
        "Phương thức",
        "t (thời gian)",
        "d (quãng đường)",
        "Khối lượng tối đa",
        "density_factor",
        "estimated_stops",
        "Phí (base / min / max)",
        "",
      ].map((h) => (
        <Text
          key={h}
          style={{ fontSize: 11, fontWeight: 600, color: "#6b7280" }}
        >
          {h}
        </Text>
      ))}
    </div>

    {rates.map((r) => (
      <RateRow key={r.id} rate={r} onEdit={onEdit} />
    ))}
  </div>
);

export default ZoneGroup;
