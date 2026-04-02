import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Space, notification, Divider } from "antd";
import { BuildOutlined } from "@ant-design/icons";
import { SelectedParts } from "../../../models/build-pc";
import PartPicker from "../../../sections/buildpc/part-picker";
import BuildSummary from "../../../sections/buildpc/build-summary";
import PartSelectionModal from "../../../sections/buildpc/part-selection-modal";
import { fetchCategories } from "@/api/categories/category-lapi";

const { Title, Text } = Typography;

const PART_SECTIONS_BASE = [
  { category: "cpu", title: "Bộ xử lý", searchKey: "cpu" },
  {
    category: "mainboard",
    title: "Bo mạch chủ",
    searchKey: "mainboard",
  },
  { category: "ram", title: "Bộ nhớ RAM", searchKey: "ram" },
  { category: "hdd", title: "Ổ HDD", searchKey: "hdd" },
  { category: "ssd", title: "Ổ SSD", searchKey: "ssd" },
  { category: "gpu", title: "Card màn hình", searchKey: "gpu" },
  { category: "psu", title: "Nguồn", searchKey: "psu" },
  { category: "case", title: "Thùng máy", searchKey: "case" },
  { category: "cooler", title: "Tản nhiệt", searchKey: "cooler" },
  { category: "monitor", title: "Màn hình", searchKey: "monitor" },
  { category: "headphone", title: "Tai nghe", searchKey: "headphone" },
  { category: "keyboard", title: "Bàn phím", searchKey: "keyboard" },
  { category: "mouse", title: "Chuột", searchKey: "mouse" },
  { category: "speaker", title: "Loa", searchKey: "speaker" },
];

const INITIAL_SELECTED = new SelectedParts();

const BuildPC = () => {
  const [selected, setSelected] = useState(INITIAL_SELECTED);
  const [categories, setCategories] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (err) {
      console.error("Failed to load categories for Build PC", err);
    }
  };

  const getCategoryId = (searchKey) => {
    const cat = categories.find(
      (c) =>
        c.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchKey.toLowerCase()),
    );
    return cat ? cat.id : null;
  };

  const handleOpenPicker = (slot) => {
    const categoryId = getCategoryId(slot.searchKey);
    if (!categoryId) {
      api.warning({
        message: "Lỗi hệ thống",
        description: `Không tìm thấy danh mục ${slot.title} trên hệ thống. Vui lòng liên hệ Admin.`,
        placement: "bottomRight",
      });
      return;
    }
    setActiveSlot({ ...slot, categoryId });
    setIsModalOpen(true);
  };

  const handleSelect = (item) => {
    setSelected((prev) => {
      const nextData = { ...prev };
      nextData[activeSlot.category] = item;
      return new SelectedParts(nextData);
    });
    api.success({
      message: "Đã chọn",
      description: `Đã thêm ${item.name} vào cấu hình.`,
      placement: "bottomRight",
    });
  };

  const handleRemove = (cat) => {
    setSelected((prev) => {
      const nextData = { ...prev };
      nextData[cat] = null;
      return new SelectedParts(nextData);
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
    const selectedCount = Object.values(selected).filter(
      (part) => part && typeof part !== "function",
    ).length;
    if (selectedCount === 0) {
      api.warning({
        message: "Cảnh báo",
        description: "Vui lòng chọn ít nhất một linh kiện.",
        placement: "bottomRight",
      });
      return;
    }
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
        <BuildOutlined style={{ fontSize: 36, color: "var(--primary-main)" }} />
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
            Tự Build PC theo Ý Muốn
          </Title>
          <Text className="text-sm" type="secondary">
            Chọn từng linh kiện phù hợp với nhu cầu và ngân sách của bạn. Hệ
            thống sẽ tự động kiểm tra tính tương thích.
          </Text>
        </div>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={16} lg={17}>
          {PART_SECTIONS_BASE.map((slot) => (
            <PartPicker
              key={slot.category}
              category={slot.category}
              title={slot.title}
              selected={selected[slot.category]}
              onPick={() => handleOpenPicker(slot)}
              onRemove={() => handleRemove(slot.category)}
            />
          ))}
        </Col>

        <Col xs={24} md={8} lg={7}>
          <div style={{ position: "sticky", top: 100 }}>
            <BuildSummary
              selected={selected}
              onRemove={handleRemove}
              onReset={handleReset}
              onAddToCart={handleAddToCart}
            />
          </div>
        </Col>
      </Row>

      <PartSelectionModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={activeSlot?.categoryId}
        categoryTitle={activeSlot?.title}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default BuildPC;
