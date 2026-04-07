import React, { useCallback, useEffect, useState } from "react";
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
import { ArrowBack as ArrowLeftIcon } from "@mui/icons-material";
import { Breadcrumb, Typography as AntdTypography } from "antd";
import AppButton from "@/components/common/buttons/button";
import AppInput from "@/components/common/input";
import Loading from "@/components/ui/state/loading";
import { enqueueSnackbar } from "notistack";
import { fetchUserById, updateUser } from "@/api/users/user-api";

const { Title: AntdTitle } = AntdTypography;

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roles: [],
    created_at: null,
    updated_at: null,
  });

  const loadData = useCallback(() => {
    setIsLoading(true);
    fetchUserById(id)
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          roles: data.roles || [],
          created_at: data.created_at || null,
          updated_at: data.updated_at || null,
        });
      })
      .catch((error) => {
        enqueueSnackbar("Lỗi tải thông tin người dùng: " + error.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) {
      navigate("/admin/users");
      return;
    }
    loadData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    updateUser(id, formData)
      .then(() => {
        enqueueSnackbar("Cập nhật thông tin thành công", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Cập nhật thất bại: " + error.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  if (isLoading) return <Loading />;

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
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ bgcolor: "white", boxShadow: 1 }}
            >
              <ArrowLeftIcon />
            </IconButton>
            <AntdTitle level={2} style={{ margin: 0 }}>
              Chi Tiết Người Dùng
            </AntdTitle>
          </Box>
          <Box sx={{ width: 150 }}>
            <AppButton
              label="Lưu Thay Đổi"
              onClick={handleUpdate}
              loading={isUpdating}
            />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Thông Tin Cá Nhân
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <AppInput
                    label="Họ tên"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput
                    label="Số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Vai Trò
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Typography variant="body2" color="text.secondary">
                Vai trò: {formData.roles.join(", ") || "Chưa có vai trò"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Ngày tạo:{" "}
                {formData.created_at &&
                  new Date(formData.created_at).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Cập nhật:{" "}
                {formData.updated_at &&
                  new Date(formData.updated_at).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
