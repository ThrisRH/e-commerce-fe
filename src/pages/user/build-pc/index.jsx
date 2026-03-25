import React, { useState } from "react";
import { Row, Col, Typography, Space, notification, Divider } from "antd";
import { BuildOutlined } from "@ant-design/icons";
import { SelectedParts } from "../../../models/build-pc";
import { PARTS_CATALOG } from "../../../sections/buildpc/build-pc.data.js";
import PartPicker from "../../../sections/buildpc/part-picker";
import BuildSummary from "../../../sections/buildpc/build-summary";

const { Title, Text } = Typography;

const PART_SECTIONS = [
  { category: "cpu", title: "🖥️ Bộ xử lý (CPU)" },
  { category: "mainboard", title: "🔌 Bo mạch chủ (Mainboard)" },
  { category: "ram", title: "💾 Bộ nhớ RAM" },
  { category: "storage", title: "💿 Ổ cứng (Storage)" },
  { category: "gpu", title: "🎮 Card đồ họa (GPU)" },
  { category: "psu", title: "⚡ Nguồn máy tính (PSU)" },
  { category: "case", title: "🗄️ Thùng máy (Case)" },
  { category: "cooler", title: "❄️ Tản nhiệt (Cooler)" },
];

const INITIAL_SELECTED = new SelectedParts();

const BuildPC = () => {
  const [selected, setSelected] = useState(INITIAL_SELECTED);
  const [api, contextHolder] = notification.useNotification();

  const handleSelect = (part) => {
    setSelected((prev) => {
      const next = new SelectedParts(prev);
      next[part.category] = part;
      return next;
    });
  };

  const handleRemove = (cat) => {
    setSelected((prev) => {
      const next = new SelectedParts(prev);
      next[cat] = null;
      return next;
    });
  };

  const handleReset = () => {
    setSelected(new SelectedParts());
    api.info({
      message: "Thông báo",
      description: "Đã xóa toàn bộ cấu hình.",
      placement: "bottomRight",
    });
  };

  const handleAddToCart = () => {
    const selectedCount = Object.values(selected).filter(Boolean).length;
    api.success({
      message: "Thành công",
      description: `Đã thêm ${selectedCount} linh kiện vào giỏ hàng!`,
      placement: "bottomRight",
    });
  };

  return (
    <div style={{ padding: "32px 50px", maxWidth: 1440, margin: "0 auto" }}>
      {contextHolder}

      <div
        style={{
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <BuildOutlined style={{ fontSize: 36, color: "#e53935" }} />
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
            Tự Build PC theo Ý Muốn
          </Title>
          <Text type="secondary">
            Chọn từng linh kiện phù hợp với nhu cầu và ngân sách của bạn
          </Text>
        </div>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={16} lg={18}>
          {PART_SECTIONS.map(({ category, title }) => (
            <PartPicker
              key={category}
              category={category}
              title={title}
              parts={PARTS_CATALOG}
              selected={selected[category]}
              onSelect={handleSelect}
              onRemove={() => handleRemove(category)}
            />
          ))}
        </Col>

        <Col xs={24} md={8} lg={6}>
          <div style={{ position: "sticky", top: 120 }}>
            <BuildSummary
              selected={selected}
              onRemove={handleRemove}
              onReset={handleReset}
              onAddToCart={handleAddToCart}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BuildPC;
