import React from "react";
import { Breadcrumb, Typography, Space, Row, Col } from "antd";
import {
  Card,
  CardContent,
  Box,
  Typography as MuiTypography,
} from "@mui/material";
import {
  Inventory,
  Category as CategoryIcon,
  People,
  ShoppingCart,
} from "@mui/icons-material";

const { Title } = Typography;

const StatCard = ({ title, value, icon, color }) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 3,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      border: "none",
    }}
  >
    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 3 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: "12px",
          bgcolor: `${color}.50`,
          color: `${color}.main`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <MuiTypography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </MuiTypography>
        <MuiTypography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
          {value}
        </MuiTypography>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const stats = [
    { title: "Sản phẩm", value: "124", icon: <Inventory />, color: "primary" },
    {
      title: "Danh mục",
      value: "12",
      icon: <CategoryIcon />,
      color: "success",
    },
    { title: "Người dùng", value: "1,240", icon: <People />, color: "info" },
    {
      title: "Đơn hàng",
      value: "45",
      icon: <ShoppingCart />,
      color: "warning",
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <div>
        <Breadcrumb items={[{ title: "Admin" }, { title: "Tổng Quan" }]} />
        <Title level={2} style={{ margin: "8px 0 0" }}>
          Tổng Quan Hệ Thống
        </Title>
      </div>

      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      <Card
        sx={{
          mt: 2,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "none",
        }}
      >
        <CardContent sx={{ p: 6, textAlign: "center" }}>
          <MuiTypography
            variant="h5"
            sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
          >
            Chào mừng trở lại, Admin!
          </MuiTypography>
          <MuiTypography variant="body1" color="text.secondary">
            Chọn một mục từ thanh điều hướng để bắt đầu quản lý hệ thống.
          </MuiTypography>
        </CardContent>
      </Card>
    </Space>
  );
};

export default AdminDashboard;
