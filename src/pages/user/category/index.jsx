import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Breadcrumb,
  Typography,
  Row,
  Col,
  Select,
  Input,
  Spin,
  Empty,
  Pagination,
  Tag,
  Space,
} from "antd";
import { SearchOutlined, AppstoreOutlined } from "@ant-design/icons";
import { fetchProductsByCategory } from "@/api/products/product-lapi";
import {
  fetchCategoryById,
  fetchCategories,
} from "@/api/categories/category-lapi";
import { Product } from "@/models/product";
import ProductCard from "@/components/ui/products/product-card";
import { enqueueSnackbar } from "notistack";

const { Title, Text } = Typography;

const SORT_OPTIONS = [
  { value: "latest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "price_asc", label: "Giá tăng dần" },
  { value: "price_desc", label: "Giá giảm dần" },
];

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get("category_id") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const sortParam = searchParams.get("sort") || "latest";
  const searchParam = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParam);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        next.set(k, String(v));
      } else {
        next.delete(k);
      }
    });
    next.set("page", "1");
    setSearchParams(next);
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchProductsByCategory(categoryId);
      const rawData = Array.isArray(res.data) ? res.data : [];
      setProducts(rawData);
      setMeta(res.meta);
    } catch (err) {
      enqueueSnackbar(err.message || "Lỗi tải sản phẩm", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [categoryId, pageParam, sortParam, searchParam]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!categoryId) {
      setCategory(null);
      return;
    }
    fetchCategoryById(categoryId)
      .then(setCategory)
      .catch(() => setCategory(null));
  }, [categoryId]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const handleSearch = () => {
    updateParams({ search: searchInput });
  };

  const handlePageChange = (page) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ padding: "28px 50px", maxWidth: 1440, margin: "0 auto" }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[
          { title: "Trang chủ", href: "/" },
          { title: category?.name || "Sản phẩm" },
        ]}
      />

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div
          style={{
            width: 220,
            flexShrink: 0,
            position: "sticky",
            top: 80,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              border: "1px solid var(--neutral-200)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                background: "var(--primary-main, #e53935)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AppstoreOutlined style={{ color: "#fff", fontSize: 15 }} />
              <Text strong style={{ color: "#fff", fontSize: 14 }}>
                Danh mục
              </Text>
            </div>

            <div style={{ padding: "8px 0" }}>
              <div
                onClick={() => updateParams({ category_id: "" })}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  borderLeft: !categoryId
                    ? "3px solid var(--primary-main, #e53935)"
                    : "3px solid transparent",
                  background: !categoryId
                    ? "var(--primary-50, #fff5f5)"
                    : "transparent",
                  fontWeight: !categoryId ? 600 : 400,
                  color: !categoryId
                    ? "var(--primary-main, #e53935)"
                    : "var(--neutral-800)",
                  fontSize: 14,
                  transition: "all 0.15s",
                }}
              >
                Tất cả sản phẩm
              </div>

              {categories.map((cat) => {
                const isActive = String(cat.id) === String(categoryId);
                return (
                  <div
                    key={cat.id}
                    onClick={() => updateParams({ category_id: cat.id })}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderLeft: isActive
                        ? "3px solid var(--primary-main, #e53935)"
                        : "3px solid transparent",
                      background: isActive
                        ? "var(--primary-50, #fff5f5)"
                        : "transparent",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? "var(--primary-main, #e53935)"
                        : "var(--neutral-700)",
                      fontSize: 14,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.background = "var(--neutral-50)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {cat.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {category?.name || "Tất cả sản phẩm"}
              </Title>
              {meta && (
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {meta.total ?? 0} sản phẩm
                </Text>
              )}
            </div>

            <Space wrap>
              <Input
                prefix={
                  <SearchOutlined style={{ color: "var(--neutral-400)" }} />
                }
                placeholder="Tìm theo tên..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onPressEnter={handleSearch}
                allowClear
                onClear={() => updateParams({ search: "" })}
                style={{ width: 220, borderRadius: 8 }}
              />
              <Select
                value={sortParam}
                onChange={(val) => updateParams({ sort: val })}
                options={SORT_OPTIONS}
                style={{ width: 170 }}
              />
            </Space>
          </div>

          {/* Active filters */}
          {(categoryId || searchParam) && (
            <div
              style={{
                marginBottom: 14,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {category && (
                <Tag
                  closable
                  color="red"
                  onClose={() => updateParams({ category_id: "" })}
                  style={{ borderRadius: 6 }}
                >
                  {category.name}
                </Tag>
              )}
              {searchParam && (
                <Tag
                  closable
                  color="default"
                  onClose={() => {
                    setSearchInput("");
                    updateParams({ search: "" });
                  }}
                  style={{ borderRadius: 6 }}
                >
                  Tìm kiếm: "{searchParam}"
                </Tag>
              )}
            </div>
          )}

          {/* Product grid */}
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "80px 0",
              }}
            >
              <Spin size="large" tip="Đang tải..." />
            </div>
          ) : products.length === 0 ? (
            <Empty
              description={
                <Text type="secondary">Không tìm thấy sản phẩm nào</Text>
              }
              style={{ padding: "60px 0" }}
            />
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {products.map((product) => (
                  <Col key={product.id} xs={12} sm={8} md={8} lg={6} xxl={4}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {meta && meta.last_page > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 32,
                  }}
                >
                  <Pagination
                    current={pageParam}
                    total={meta.total}
                    pageSize={meta.per_page || 12}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showTotal={(total) => `${total} sản phẩm`}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
