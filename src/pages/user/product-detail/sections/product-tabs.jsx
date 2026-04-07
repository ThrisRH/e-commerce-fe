import React from "react";
import { Tabs, Typography, Card, Rate } from "antd";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const { Title, Text, Paragraph } = Typography;

const LOREM_FEATURES = [
  "Hiệu suất cao với bộ xử lý thế hệ mới nhất, tốc độ xử lý vượt trội",
  "Màn hình sắc nét với tấm nền IPS, dải màu rộng 100% sRGB",
  "Thời lượng pin ấn tượng lên đến 12 giờ liên tục",
  "Thiết kế mỏng nhẹ, dễ dàng mang theo mọi nơi",
  "Bàn phím chiclet thoải mái, đèn nền RGB có thể tùy chỉnh",
  "Cổng kết nối đa dạng: USB-C, HDMI, SD Card, USB 3.0",
];

const ProductTabs = ({ product, avgRating, mockReviews }) => {
  const tabItems = [
    {
      key: "description",
      label: "Mô tả chi tiết",
      children: (
        <div style={{ padding: "24px 0" }}>
          <Paragraph
            style={{
              color: "var(--neutral-700)",
              lineHeight: 1.8,
              marginBottom: 20,
            }}
          >
            {product.description}
          </Paragraph>
          <Title level={5} style={{ marginBottom: 12 }}>
            Tính năng nổi bật
          </Title>
          <ul
            style={{
              paddingLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {LOREM_FEATURES.map((f) => (
              <li
                key={f}
                style={{ color: "var(--neutral-700)", lineHeight: 1.7 }}
              >
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
                        background:
                          idx % 2 === 0 ? "var(--neutral-50)" : "#fff",
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
                      <TableCell
                        sx={{
                          color: "var(--neutral-900)",
                          fontSize: 13,
                          py: 1.5,
                        }}
                      >
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
      label: `Đánh giá (${mockReviews.length})`,
      children: (
        <div
          style={{
            padding: "24px 0",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
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
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "var(--primary-main)",
                  lineHeight: 1,
                }}
              >
                {avgRating}
              </div>
              <Rate
                value={avgRating}
                allowHalf
                disabled
                style={{ fontSize: 16 }}
              />
              <div
                style={{
                  fontSize: 12,
                  color: "var(--neutral-500)",
                  marginTop: 4,
                }}
              >
                {mockReviews.length} đánh giá
              </div>
            </div>
          </div>

          {mockReviews.map((r, i) => (
            <Card
              key={i}
              size="small"
              style={{
                borderRadius: 10,
                border: "1px solid var(--neutral-200)",
              }}
              bodyStyle={{ padding: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div>
                  <Text strong>{r.name}</Text>
                  <Rate
                    value={r.rating}
                    disabled
                    style={{ fontSize: 12, marginLeft: 10 }}
                  />
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
    <div style={{ marginTop: 40 }}>
      <Tabs
        size="large"
        items={tabItems}
        tabBarStyle={{ borderBottom: "2px solid var(--neutral-200)" }}
        tabBarGutter={32}
      />
    </div>
  );
};

export default ProductTabs;
