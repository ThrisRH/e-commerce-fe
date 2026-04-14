import React, { useState, useEffect, useCallback } from "react";
import { Button, message, Spin, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { fetchShippingRates } from "@/api/shipping/shipping-api";

import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";

import ZoneGroup from "./sections/zone-group";
import RateEditModal from "./sections/rate-edit-modal";

const { Text } = Typography;

export default function ShippingConfig() {
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

  const headerExtra = (
    <Button
      icon={<ReloadOutlined />}
      onClick={loadRates}
      loading={loading}
      style={{ height: 36, borderRadius: 8 }}
    >
      Tải lại
    </Button>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Cấu hình vận chuyển"
        subtitle="Xem và chỉnh sửa mức phí theo từng khu vực và phương thức."
        extra={headerExtra}
        onBack={undefined}
        breadcrumbItems={undefined}
      />

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
    </PageContainer>
  );
}
