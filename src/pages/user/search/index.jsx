import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Typography, Row, Col, Spin, Pagination, Tag } from "antd";
import { searchProducts } from "@/api/products/product-api";
import ProductCard from "@/components/ui/products/product-card";
import NotFound from "@/components/common/not-found";
import { enqueueSnackbar } from "notistack";

const { Title, Text } = Typography;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("keyword") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await searchProducts(query, pageParam, 12);
      setProducts(res.data || []);
      setMeta(res.meta);
    } catch (err) {
      enqueueSnackbar(err.message || "Lỗi tải sản phẩm tìm kiếm", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [query, pageParam]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handlePageChange = (page) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        padding: "28px 50px",
        maxWidth: 1280,
        margin: "0 auto",
        minHeight: "60vh",
      }}
    >
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[{ title: "Trang chủ", href: "/" }, { title: "Tìm kiếm" }]}
      />

      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Kết quả tìm kiếm cho:{" "}
          <span style={{ color: "#e53935" }}>"{query}"</span>
        </Title>
        {meta && (
          <Text type="secondary" style={{ fontSize: 14 }}>
            Tìm thấy {meta.total ?? 0} sản phẩm phù hợp
          </Text>
        )}
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "100px 0",
          }}
        >
          <Spin size="large" tip="Đang tìm kiếm sản phẩm..." />
        </div>
      ) : products.length === 0 ? (
        <NotFound
          title="Sản phẩm không tồn tại"
          description={`Không tìm thấy sản phẩm nào khớp với từ khóa "${query}". Vui lòng thử lại với từ khóa khác.`}
          buttonText="Quay lại trang chủ"
          onButtonClick={() => navigate("/")}
        />
      ) : (
        <>
          <Row gutter={[16, 24]}>
            {products.map((product) => (
              <Col
                key={product.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}
                style={{ flex: "0 0 20%", maxWidth: "20%" }}
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {meta && meta.last_page > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <Pagination
                current={pageParam}
                total={meta.total}
                pageSize={meta.per_page || 12}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}

      <style>{`
        @media (max-width: 1200px) {
          .ant-col-lg-4-8 { flex: 0 0 25% !important; maxWidth: 25% !important; }
        }
        @media (max-width: 992px) {
          .ant-col-md-6 { flex: 0 0 33.333% !important; maxWidth: 33.333% !important; }
        }
        @media (max-width: 768px) {
          .ant-col-sm-8 { flex: 0 0 50% !important; maxWidth: 50% !important; }
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
