import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  InputNumber,
  Button,
  Typography,
  Spin,
  Modal,
  message,
} from "antd";
import { SaveOutlined, ReloadOutlined, EditOutlined } from "@ant-design/icons";
import {
  fetchShippingRates,
  updateShippingRate,
} from "@/api/shipping/shipping-api";

const { Title, Text } = Typography;

const fmtVnd = (v) =>
  v != null ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ" : "—";

// ─── Tiny label/value pair ────────────────────────────────────────────────────
const KV = ({ label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Text style={{ fontSize: 11, color: "#9ca3af" }}>{label}</Text>
    <Text style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>
      {value}
    </Text>
  </div>
);

// ─── Edit modal ───────────────────────────────────────────────────────────────
const RateEditModal = ({ rate, open, onClose, onSaved }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && rate) {
      form.setFieldsValue({
        base_fee: rate.base_fee,
        min_fee: rate.min_fee,
        max_fee: rate.max_fee,
      });
    }
  }, [open, rate]);

  const handleSave = async () => {
    const values = await form.validateFields();
    setSaving(true);
    try {
      const updated = await updateShippingRate(rate.id, values);
      message.success("Cập nhật thành công!");
      onSaved(updated);
      onClose();
    } catch {
      message.error("Cập nhật thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const NumField = ({ label, name, required = false }) => (
    <Form.Item
      label={<Text style={{ fontSize: 13 }}>{label}</Text>}
      name={name}
      rules={required ? [{ required: true }] : []}
      style={{ marginBottom: 12 }}
    >
      <InputNumber
        style={{ width: "100%", height: 40 }}
        controls={false}
        formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        addonAfter="đ"
        min={0}
      />
    </Form.Item>
  );

  if (!rate) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      confirmLoading={saving}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ icon: <SaveOutlined /> }}
      width={400}
      title={
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Chỉnh sửa mức phí</div>
          <Text style={{ fontSize: 12, color: "#6b7280", fontWeight: 400 }}>
            {rate.shipping_zone?.name} — {rate.shipping_method?.name}
          </Text>
        </div>
      }
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <NumField label="Phí cơ bản" name="base_fee" required />
        <NumField label="Phí tối thiểu" name="min_fee" />
        <NumField label="Phí tối đa" name="max_fee" />
      </Form>
    </Modal>
  );
};

// ─── RateRow: single horizontal row ──────────────────────────────────────────
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

// ─── ZoneGroup ────────────────────────────────────────────────────────────────
const ZoneGroup = ({ zoneName, rates, onEdit }) => (
  <div
    style={{
      marginBottom: 16,
      borderRadius: 10,
      overflow: "hidden",
      border: "1px solid #e5e7eb",
    }}
  >
    {/* Zone header */}
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

    {/* Column header */}
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

// ─── Main ─────────────────────────────────────────────────────────────────────
const ShippingConfig = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRate, setEditingRate] = useState(null);

  const loadRates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchShippingRates();
      setRates(data);
    } catch {
      message.error("Không thể tải cấu hình vận chuyển");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const handleSaved = (updated) => {
    if (!updated) {
      loadRates();
      return;
    }
    setRates((prev) =>
      prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
    );
  };

  // Group by zone
  const grouped = rates.reduce((acc, r) => {
    const zoneId = r.shipping_zone_id;
    if (!acc[zoneId]) {
      acc[zoneId] = {
        name: r.shipping_zone?.name ?? `Zone #${zoneId}`,
        rates: [],
      };
    }
    acc[zoneId].rates.push(r);
    return acc;
  }, {});

  return (
    <div style={{ padding: "24px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Cấu hình vận chuyển
          </Title>
          <Text style={{ color: "#6b7280", fontSize: 13 }}>
            Xem và chỉnh sửa mức phí theo từng khu vực và phương thức.
          </Text>
        </div>
        <Button
          icon={<ReloadOutlined />}
          onClick={loadRates}
          loading={loading}
          style={{ height: 36, borderRadius: 8 }}
        >
          Tải lại
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Spin size="large" />
        </div>
      ) : rates.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            background: "#fff",
            borderRadius: 10,
            border: "1px dashed #d1d5db",
          }}
        >
          <Text style={{ color: "#9ca3af" }}>Chưa có cấu hình nào</Text>
        </div>
      ) : (
        Object.entries(grouped).map(([zoneId, group]) => (
          <ZoneGroup
            key={zoneId}
            zoneName={group.name}
            rates={group.rates}
            onEdit={setEditingRate}
          />
        ))
      )}

      <RateEditModal
        rate={editingRate}
        open={editingRate !== null}
        onClose={() => setEditingRate(null)}
        onSaved={handleSaved}
      />
    </div>
  );
};

export default ShippingConfig;
