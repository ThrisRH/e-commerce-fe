import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  List,
  Avatar,
  Typography,
  Button,
  Spin,
  Empty,
  Space,
} from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { fetchCategoryById } from "@/api/categories/category-lapi";
import { formatCurrency } from "@/components/utils/format-currency";
import { Product } from "@/models/product";

const { Text, Title } = Typography;

const PartSelectionModal = ({
  visible,
  onClose,
  categoryId,
  categoryTitle,
  onSelect,
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (visible && categoryId) {
      loadProducts();
    }
  }, [visible, categoryId]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const category = await fetchCategoryById(categoryId);
      const items = (category.products.data || []).map((p) => new Product(p));
      setProducts(items);
    } catch (err) {
      console.error("Error loading products for build pc:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Modal
      title={
        <div style={{ paddingBottom: 8 }}>
          <Title level={4} style={{ margin: 0 }}>
            Chọn {categoryTitle}
          </Title>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      styles={{
        body: { padding: "12px 24px 24px" },
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="Tìm kiếm linh kiện theo tên..."
          prefix={<SearchOutlined style={{ color: "var(--neutral-400)" }} />}
          size="large"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ borderRadius: 8 }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" tip="Đang tải danh sách linh kiện..." />
        </div>
      ) : filteredProducts.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={filteredProducts}
          style={{ maxHeight: "60vh", overflowY: "auto" }}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "16px",
                borderRadius: 8,
                transition: "background 0.2s",
                cursor: "pointer",
                border: "1px solid var(--neutral-100)",
                marginBottom: 12,
              }}
              key={item.id}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.image_url}
                    shape="square"
                    size={64}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--neutral-200)",
                    }}
                  />
                }
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <Text strong style={{ fontSize: 15 }}>
                      {item.name}
                    </Text>
                    <Text
                      strong
                      style={{ color: "var(--primary-main)", fontSize: 16 }}
                    >
                      {formatCurrency(item.price)}
                    </Text>
                  </div>
                }
                description={
                  <Space direction="vertical" size={2}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.brand_id ||
                        item.brand?.name ||
                        "Thương hiệu No Brand"}
                    </Text>
                    <Text italic type="secondary" style={{ fontSize: 11 }}>
                      {item.description
                        ? item.description.slice(0, 150) + "..."
                        : "Không có mô tả cho linh kiện này"}
                    </Text>
                  </Space>
                }
              />
              <div style={{ marginLeft: 20 }}>
                <Button
                  type="primary"
                  ghost
                  icon={<PlusCircleOutlined />}
                  style={{
                    borderColor: "var(--primary-main)",
                    color: "var(--primary-main)",
                    borderRadius: 6,
                    minWidth: 90,
                  }}
                >
                  Chọn
                </Button>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">Chưa có sản phẩm trong hạng mục này</Text>
            </div>
          }
          style={{ padding: "40px 0" }}
        />
      )}
    </Modal>
  );
};

export default PartSelectionModal;
