import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import {
  ArrowBack as ArrowLeftIcon,
} from "@mui/icons-material";
import { Breadcrumb, Typography as AntdTypography } from "antd";
import AppButton from "@/components/common/button";
import AppInput from "@/components/common/input";
import Loading from "@/components/ui/state/loading";
import { enqueueSnackbar } from "notistack";

const { Title: AntdTitle } = AntdTypography;

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Basic placeholder load
    setLoading(true);
    setTimeout(() => {
        setUserData({
            id: id,
            name: "John Doe",
            email: "john@example.com",
            phone: "0123456789",
            roles: ["customer"]
        });
        setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumb
          items={[
            { title: "Admin", href: "/admin" },
            { title: "Quản Lý Người Dùng", href: "/admin/users" },
            { title: "Chi Tiết" },
          ]}
        />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "white", boxShadow: 1 }}>
              <ArrowLeftIcon />
            </IconButton>
            <AntdTitle level={2} style={{ margin: 0 }}>
              Chi Tiết Người Dùng
            </AntdTitle>
          </Box>
          <Box sx={{ width: 150 }}>
            <AppButton label="Lưu Thay Đổi" onClick={() => {}} />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Thông Tin Cá Nhân
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <AppInput label="Họ tên" name="name" value={userData?.name || ""} onChange={() => {}} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput label="Email" name="email" value={userData?.email || ""} onChange={() => {}} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput label="Số điện thoại" name="phone" value={userData?.phone || ""} onChange={() => {}} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Phân Quyền
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {/* Add role checkboxes or select here */}
              <Typography variant="body2" color="text.secondary">
                Quyền hiện tại: {userData?.roles.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
