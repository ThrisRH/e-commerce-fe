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

// Components
import ProductGallery from "./sections/product-gallary";
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
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductBySlug(slug, sku);
        setProduct(productData);

        // if (productData.basic_info?.category?.id) {
        //   const relatedRes = await fetchProductsByCategory(
        //     productData.basic_info.category.id,
        //   );
        //   // Filter out current product and take first 4-8 items
        //   const filtered = (relatedRes.data || []).filter(
        //     (p) => p.id !== productData.id,
        //   );
        //   setRelatedProducts(filtered.slice(0, 10));
        // }
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
            handleAddToCart={(e, prod, qty) =>
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
              )
            }
          />
        </Col>
      </Row>

      <ProductTabs
        product={product}
        avgRating={avgRating}
        mockReviews={MOCK_REVIEWS}
      />

      {/* {relatedProducts.length > 0 && (
        <div style={{ marginTop: 64 }}>
          <Divider style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div style={{ textAlign: "left", width: "100%" }}>
              <Title level={3} style={{ margin: 0 }}>
                Sản phẩm liên quan
              </Title>
            </div>
          </Divider>
          <Row gutter={[6, 6]} style={{ marginTop: 24 }}>
            {relatedProducts.map((p) => (
              <Col key={p.id} xs={12} sm={8} md={6} lg={6} xxl={6}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </div>
      )} */}
    </div>
  );
};

export default UserProductDetail;
