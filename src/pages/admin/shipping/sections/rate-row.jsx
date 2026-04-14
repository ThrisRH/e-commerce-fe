import React from "react";
import { Typography, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

const fmtVnd = (v) =>
  v != null ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ" : "—";

const KV = ({ label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Text style={{ fontSize: 11, color: "#9ca3af" }}>{label}</Text>
    <Text style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>
      {value}
    </Text>
  </div>
);

const RateRow = ({ rate, onEdit }) => {
  const method = rate.shipping_method ?? {};
  const zone = rate.shipping_zone ?? {};

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr 1fr 1fr 1fr 1fr 1fr 80px",
        alignItems: "center",
        gap: 4,
        padding: "12px 16px",
        background: "#fff",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: 600 }}>
        {method.name ?? `Method #${rate.shipping_method_id}`}
      </Text>
      <KV label="t (thời gian)" value={method.time_coefficient ?? "—"} />
      <KV label="d (quãng đường)" value={method.distance_coefficient ?? "—"} />
      <KV
        label="Khối lượng tối đa"
        value={
          method.max_weight != null ? `${method.max_weight / 1000} kg` : "—"
        }
      />
      <KV label="density_factor" value={zone.density_factor ?? "—"} />
      <KV label="estimated_stops" value={zone.estimated_stops ?? "—"} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Text style={{ fontSize: 11, color: "#9ca3af" }}>base / min / max</Text>
        <Text style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>
          {fmtVnd(rate.base_fee)}
        </Text>
        <Text style={{ fontSize: 11, color: "#6b7280" }}>
          {fmtVnd(rate.min_fee)} — {fmtVnd(rate.max_fee)}
        </Text>
      </div>
      <div style={{ textAlign: "right" }}>
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit(rate)}
          style={{ height: 30, borderRadius: 6, fontSize: 12 }}
        >
          Sửa
        </Button>
      </div>
    </div>
  );
};

export default RateRow;
