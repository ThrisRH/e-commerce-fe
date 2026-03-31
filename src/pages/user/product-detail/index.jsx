import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Typography,
  Tag,
  Button,
  Rate,
  Divider,
  Tabs,
  Spin,
  InputNumber,
  Space,
  Image,
  Row,
  Col,
  Card,
} from "antd";
import {
  ShoppingCartOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchProductById } from "@/api/products/product-lapi";
import { enqueueSnackbar } from "notistack";
import { formatCurrency } from "@/components/utils/format-currency";

const { Title, Text, Paragraph } = Typography;

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const LOREM_FEATURES = [
  "Hiệu suất cao với bộ xử lý thế hệ mới nhất, tốc độ xử lý vượt trội",
  "Màn hình sắc nét với tấm nền IPS, dải màu rộng 100% sRGB",
  "Thời lượng pin ấn tượng lên đến 12 giờ liên tục",
  "Thiết kế mỏng nhẹ, dễ dàng mang theo mọi nơi",
  "Bàn phím chiclet thoải mái, đèn nền RGB có thể tùy chỉnh",
  "Cổng kết nối đa dạng: USB-C, HDMI, SD Card, USB 3.0",
];

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

const PolicyBadge = ({ icon, title, subtitle }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 16px",
      background: "var(--neutral-50)",
      borderRadius: 8,
      border: "1px solid var(--neutral-200)",
      flex: 1,
      minWidth: 140,
    }}
  >
    <span style={{ fontSize: 22, color: "var(--primary-main)" }}>{icon}</span>
    <div>
      <div style={{ fontWeight: 600, fontSize: 12, color: "var(--neutral-800)" }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: "var(--neutral-500)" }}>{subtitle}</div>
    </div>
  </div>
);

const UserProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => {
        enqueueSnackbar(err.message || "Không tìm thấy sản phẩm", {
          variant: "error",
        });
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id]);

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

  const tabItems = [
    {
      key: "description",
      label: "Mô tả chi tiết",
      children: (
        <div style={{ padding: "24px 0" }}>
          <Paragraph style={{ color: "var(--neutral-700)", lineHeight: 1.8, marginBottom: 20 }}>
            {product.description || LOREM}
          </Paragraph>
          <Paragraph style={{ color: "var(--neutral-700)", lineHeight: 1.8, marginBottom: 24 }}>
            {LOREM}
          </Paragraph>
          <Title level={5} style={{ marginBottom: 12 }}>
            Tính năng nổi bật
          </Title>
          <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {LOREM_FEATURES.map((f) => (
              <li key={f} style={{ color: "var(--neutral-700)", lineHeight: 1.7 }}>
                {f}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: "specs",
      label: "Thông số kỹ thuật",
      children: (
        <div style={{ padding: "24px 0" }}>
          {product.attributes && product.attributes.length > 0 ? (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: "1px solid var(--neutral-200)", borderRadius: 2 }}
            >
              <Table size="small">
                <TableBody>
                  {product.attributes.map((attr, idx) => (
                    <TableRow
                      key={attr.id || idx}
                      sx={{
                        background: idx % 2 === 0 ? "var(--neutral-50)" : "#fff",
                        "&:last-child td": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          width: 200,
                          fontWeight: 600,
                          color: "var(--neutral-700)",
                          borderRight: "1px solid var(--neutral-200)",
                          fontSize: 13,
                          py: 1.5,
                        }}
                      >
                        {attr.name}
                      </TableCell>
                      <TableCell sx={{ color: "var(--neutral-900)", fontSize: 13, py: 1.5 }}>
                        {attr.value}
                        {attr.unit ? ` ${attr.unit}` : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Text type="secondary">Chưa có thông số kỹ thuật.</Text>
          )}
        </div>
      ),
    },
    {
      key: "reviews",
      label: `Đánh giá (${MOCK_REVIEWS.length})`,
      children: (
        <div style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: 20,
              background: "var(--neutral-50)",
              borderRadius: 10,
              border: "1px solid var(--neutral-200)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: "var(--primary-main)", lineHeight: 1 }}>
                {avgRating}
              </div>
              <Rate value={avgRating} allowHalf disabled style={{ fontSize: 16 }} />
              <div style={{ fontSize: 12, color: "var(--neutral-500)", marginTop: 4 }}>
                {MOCK_REVIEWS.length} đánh giá
              </div>
            </div>
          </div>

          {MOCK_REVIEWS.map((r, i) => (
            <Card
              key={i}
              size="small"
              style={{ borderRadius: 10, border: "1px solid var(--neutral-200)" }}
              bodyStyle={{ padding: "16px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div>
                  <Text strong>{r.name}</Text>
                  <Rate value={r.rating} disabled style={{ fontSize: 12, marginLeft: 10 }} />
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {r.date}
                </Text>
              </div>
              <Text style={{ color: "var(--neutral-700)" }}>{r.comment}</Text>
            </Card>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "32px 50px", margin: "0 auto" }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[
          { title: "Trang chủ", href: "/" },
          { title: product.category?.name || "Sản phẩm" },
          { title: product.name },
        ]}
      />

      <Row gutter={[32, 32]}>
        <Col xs={24} md={10}>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid var(--neutral-200)",
              overflow: "hidden",
              padding: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={product.image_url || "https://via.placeholder.com/400x400?text=No+Image"}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: 380,
                objectFit: "contain",
              }}
              fallback="https://via.placeholder.com/400x400?text=No+Image"
            />
          </div>
        </Col>

        <Col xs={24} md={14}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.brand?.name && (
                <Tag color="blue" style={{ borderRadius: 4 }}>
                  {product.brand.name}
                </Tag>
              )}
              {product.category?.name && (
                <Tag color="default" style={{ borderRadius: 4 }}>
                  {product.category.name}
                </Tag>
              )}
              {product.is_active ? (
                <Tag color="success">Còn hàng ({product.stock})</Tag>
              ) : (
                <Tag color="error">Hết hàng</Tag>
              )}
            </div>

            <Title level={3} style={{ margin: 0 }}>
              {product.name}
            </Title>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Rate value={avgRating} allowHalf disabled style={{ fontSize: 14 }} />
              <Text type="secondary" style={{ fontSize: 13 }}>
                {avgRating}/5 · {MOCK_REVIEWS.length} đánh giá
              </Text>
            </div>

            <div
              style={{
                padding: "16px 20px",
                background: "var(--primary-50)",
                borderRadius: 10,
                borderLeft: "4px solid var(--primary-main)",
              }}
            >
              <Title level={2} style={{ color: "var(--primary-main)", margin: 0 }}>
                {formatCurrency(product.price)}
              </Title>
              <Text style={{ fontSize: 12, color: "var(--neutral-600)" }}>
                Giá đã bao gồm VAT
              </Text>
            </div>

            <Text style={{ color: "var(--neutral-600)", lineHeight: 1.8 }}>
              {product.description?.slice(0, 200) ||
                LOREM.slice(0, 200)}
              ...
            </Text>

            <Divider style={{ margin: "4px 0" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Text style={{ fontWeight: 500 }}>Số lượng:</Text>
              <InputNumber
                min={1}
                max={product.stock || 99}
                value={quantity}
                onChange={(val) => setQuantity(val)}
                style={{ width: 100 }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                ({product.stock || 0} sản phẩm có sẵn)
              </Text>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button
                type="primary"
                size="large"
                icon={<ThunderboltOutlined />}
                style={{
                  flex: 1,
                  minWidth: 140,
                  height: 48,
                  background: "var(--primary-main)",
                  borderColor: "var(--primary-main)",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(229,57,53,0.4)",
                }}
              >
                Mua ngay
              </Button>
              <Button
                size="large"
                icon={<ShoppingCartOutlined />}
                style={{
                  flex: 1,
                  minWidth: 140,
                  height: 48,
                  borderColor: "var(--primary-main)",
                  color: "var(--primary-main)",
                  fontWeight: 600,
                }}
              >
                Thêm vào giỏ
              </Button>
              <Button
                size="large"
                icon={<HeartOutlined />}
                style={{ height: 48, width: 48 }}
              />
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <PolicyBadge
                icon={<TruckOutlined />}
                title="Miễn phí vận chuyển"
                subtitle="Đơn từ 500.000đ"
              />
              <PolicyBadge
                icon={<SafetyCertificateOutlined />}
                title="Bảo hành chính hãng"
                subtitle="12 tháng"
              />
              <PolicyBadge
                icon={<ReloadOutlined />}
                title="Đổi trả miễn phí"
                subtitle="Trong 30 ngày"
              />
            </div>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 40 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          items={tabItems}
          tabBarStyle={{ borderBottom: "2px solid var(--neutral-200)" }}
          tabBarGutter={32}
        />
      </div>
    </div>
  );
};

export default UserProductDetail;
