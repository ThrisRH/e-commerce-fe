import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Breadcrumb, Spin, Row, Col, Typography, Divider } from "antd";
import {
  fetchProductBySlug,
  fetchProductsByCategory,
} from "@/api/products/product-api";
import { enqueueSnackbar } from "notistack";
import { handleAddToCart } from "@/utils/add-to-cart";

import ProductGallery from "./sections/product-gallery";
import ProductInfo from "./sections/product-info";
import ProductTabs from "./sections/product-tabs";

const { Title } = Typography;

const MOCK_REVIEWS = [
  {
    name: "Nguyễn Văn A",
    rating: 5,
    date: "20/03/2026",
    comment: "Sản phẩm rất tốt, giao hàng nhanh, đóng gói cẩn thận.",
  },
  {
    name: "Trần Thị B",
    rating: 4,
    date: "18/03/2026",
    comment: "Chất lượng đúng như mô tả, dùng được vài ngày thấy ổn.",
  },
  {
    name: "Lê Văn C",
    rating: 5,
    date: "15/03/2026",
    comment: "Mua lần 2 rồi, vẫn rất hài lòng về sản phẩm và dịch vụ.",
  },
];

const UserProductDetail = () => {
  const [searchParams] = useSearchParams();
  const sku = searchParams.get("sku");

  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductBySlug(slug, sku);
        setProduct(productData);
        console.log(productData);
      } catch (err) {
        enqueueSnackbar(err.message || "Không tìm thấy sản phẩm", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [slug, sku, navigate]);

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    navigate("/checkout", {
      state: {
        buyNowItem: {
          variantId: product.id,
          quantity: quantity,
          slug: product.basic_info.slug,
          sku: product.sku,
        },
      },
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  if (!product) return null;

  const avgRating = 4.5;

  console.log(product);
  return (
    <div style={{ padding: "32px 50px", margin: "0 auto", maxWidth: 1440 }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[
          { title: "Trang chủ", href: "/" },
          {
            title: product.basic_info?.category?.name || "Sản phẩm",
            href: `/category?category_id=${product.basic_info?.category?.id}`,
          },
          { title: product.name },
        ]}
      />

      <Row gutter={[32, 32]}>
        <Col xs={24} md={10}>
          <ProductGallery product={product} />
        </Col>

        <Col xs={24} md={14}>
          <ProductInfo
            product={product}
            avgRating={avgRating}
            mockReviewsCount={MOCK_REVIEWS.length}
            quantity={quantity}
            setQuantity={setQuantity}
            handleBuyNow={handleBuyNow}
            handleAddToCart={(e, prod, qty) => {
              if (prod.stock <= 0) return;
              handleAddToCart(
                [
                  {
                    slug: prod.basic_info.slug,
                    variantId: prod.id,
                    sku: prod.sku,
                    quantity: qty,
                  },
                ],
                e,
              );
            }}
          />
        </Col>
      </Row>

      <ProductTabs
        product={product}
        avgRating={avgRating}
        mockReviews={MOCK_REVIEWS}
      />
    </div>
  );
};

export default UserProductDetail;
