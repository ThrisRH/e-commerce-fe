
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
  Tag,
  Row,
  Col,
  Divider,
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "@/utils/format-currency";
import { Product } from "@/models/product";
import { searchProducts, fetchProducts } from "@/api/products/product-api";

const { Text, Title, Paragraph } = Typography;

const ProductSelectionModal = ({ visible, onClose, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (visible) {
      loadInitialProducts();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setSelectedProduct(null);
        setSearch("");
      }, 300);
    }
  }, [visible]);

  const loadInitialProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts({ page: 1, limit: 20 });
      
      const items = (response.data || []).map((p) => new Product(p));
      setProducts(items);
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);
    if (!value) {
      loadInitialProducts();
      return;
    }

    setLoading(true);
    try {
      const response = await searchProducts(value, 1, 20);
      
      const items = (response.data || []).map((p) => new Product(p));
      setProducts(items);
    } catch (err) {
      console.error("Error searching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    if (product.variants && product.variants.length === 1) {
      handleVariantSelect(product.variants[0], product);
    } else if (product.variants && product.variants.length > 1) {
      setSelectedProduct(product);
    } else {
      onSelect({
        ...product,
        sku: product.sku || product.slug, 
      });
      onClose();
    }
  };

  const handleVariantSelect = (variant, product) => {
    const attributesText = variant.attribute_values
      ?.map((a) => `${a.value}${a.unit || ""}`)
      .join(" ");

    const fullItem = {
      ...product,
      id: product.id,
      variant_id: variant.id,
      slug: product.slug,
      sku: variant.sku,
      display_name: attributesText
        ? `${product.name} - ${attributesText}`
        : product.name,
      price: variant.price,
      image_url: variant.image_url || product.image_url,
    };
    onSelect(fullItem);
    onClose();
  };

  return (
    <Modal
      title={
        <div
          style={{
            paddingBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {selectedProduct && (
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedProduct(null)}
              style={{ padding: 0, width: 32, height: 32 }}
            />
          )}
          <Title level={4} style={{ margin: 0 }}>
            {selectedProduct
              ? `Chọn phiên bản: ${selectedProduct.name}`
              : `Chọn sản phẩm`}
          </Title>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={selectedProduct ? 600 : 850}
      centered
      styles={{
        body: {
          padding: "12px 24px 24px",
          minHeight: selectedProduct ? "400px" : "600px",
        },
      }}
    >
      {!selectedProduct ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <Input
              placeholder="Tìm kiếm sản phẩm theo tên..."
              prefix={
                <SearchOutlined style={{ color: "var(--neutral-400)" }} />
              }
              size="large"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              style={{ borderRadius: 8 }}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Spin size="large" tip="Đang tải danh sách sản phẩm..." />
            </div>
          ) : products.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={products}
              style={{ maxHeight: "60vh", overflowY: "auto" }}
              renderItem={(item) => (
                <List.Item
                  className="hover-card"
                  style={{
                    padding: "16px",
                    borderRadius: 12,
                    transition: "all 0.2s",
                    cursor: "pointer",
                    border: "1px solid var(--neutral-100)",
                    marginBottom: 12,
                    background: "#fff",
                  }}
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item.image_url}
                        shape="square"
                        size={80}
                        style={{
                          background: "#fff",
                          border: "1px solid var(--neutral-200)",
                          borderRadius: 8,
                        }}
                      />
                    }
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          gap: 24,
                        }}
                      >
                        <Paragraph
                          strong
                          style={{
                            fontSize: 16,
                            flex: 1,
                            marginBottom: 0,
                            lineHeight: "1.4",
                          }}
                          ellipsis={{ rows: 2 }}
                        >
                          {item.name}
                        </Paragraph>
                        <Space
                          direction="vertical"
                          align="end"
                          size={0}
                          style={{ minWidth: 180 }}
                        >
                          <Text
                            strong
                            style={{
                              color: "var(--primary-main)",
                              fontSize: 16,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.price_min === item.price_max
                              ? formatCurrency(item.price_min)
                              : `${formatCurrency(item.price_min)} - ${formatCurrency(item.price_max)}`}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {item.variants_count} phiên bản
                          </Text>
                        </Space>
                      </div>
                    }
                    description={
                      <div style={{ marginTop: 4 }}>
                        <div style={{ marginBottom: 4 }}>
                          <Tag color="blue">
                            {item.brand?.name || "No Brand"}
                          </Tag>
                          <Tag color="cyan">{item.category?.name}</Tag>
                        </div>
                        <Paragraph
                          italic
                          type="secondary"
                          style={{ fontSize: 12, marginBottom: 0 }}
                          ellipsis={{ rows: 2 }}
                        >
                          {item.description || "Không có mô tả"}
                        </Paragraph>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Chưa có sản phẩm nào"
              style={{ padding: "40px 0" }}
            />
          )}
        </>
      ) : (
        <div className="variant-selection">
          <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
            Vui lòng chọn một phiên bản cụ thể:
          </Text>
          <Row gutter={[16, 16]}>
            {selectedProduct.variants.map((v) => (
              <Col span={24} key={v.id}>
                <div
                  className="variant-card"
                  style={{
                    padding: 16,
                    border: "1px solid #e8e8e8",
                    borderRadius: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.3s",
                  }}
                  onClick={() => handleVariantSelect(v, selectedProduct)}
                >
                  <Space size="large">
                    <img
                      src={v.image_url || selectedProduct.image_url}
                      alt={v.sku}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #f0f0f0",
                      }}
                    />
                    <div>
                      <Text strong style={{ fontSize: 14 }}>
                        {v.attribute_values
                          ?.map(
                            (a) =>
                              `${a.attribute_name}: ${a.value} ${a.unit || ""}`,
                          )
                          .join(" | ") || v.sku}
                      </Text>
                      <div style={{ marginTop: 4 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          SKU: {v.sku}
                        </Text>
                        <Divider type="vertical" />
                        <Text
                          type={v.stock > 0 ? "success" : "danger"}
                          style={{ fontSize: 12 }}
                        >
                          {v.stock > 0 ? `Còn hàng (${v.stock})` : "Hết hàng"}
                        </Text>
                      </div>
                    </div>
                  </Space>
                  <div style={{ textAlign: "right" }}>
                    <Text
                      strong
                      style={{
                        color: "var(--primary-main)",
                        fontSize: 17,
                        display: "block",
                      }}
                    >
                      {formatCurrency(v.price)}
                    </Text>
                    <PlusCircleOutlined
                      style={{
                        color: "var(--primary-main)",
                        fontSize: 20,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Modal>
  );
};

export default ProductSelectionModal;
