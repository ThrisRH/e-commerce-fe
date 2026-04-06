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
import AppButton from "@/components/common/button";
import AppInput from "@/components/common/input";
import Loading from "@/components/ui/state/loading";
import { enqueueSnackbar } from "notistack";
import { fetchRoleById, updateRole } from "@/api/users/user-api";

const { Title: AntdTitle } = AntdTypography;

export default function RoleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    description: "",
    guard_name: "api",
    created_at: null,
    updated_at: null,
  });

  const loadData = useCallback(() => {
    setIsLoading(true);
    fetchRoleById(id)
      .then((data) => {
        setFormData({
          name: data.name || "",
          display_name: data.display_name || "",
          description: data.description || "",
          guard_name: data.guard_name || "api",
          created_at: data.created_at,
          updated_at: data.updated_at,
        });
      })
      .catch((error) => {
        enqueueSnackbar("Lỗi tải thông tin vai trò: " + error.message, {
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
    updateRole(id, formData)
      .then(() => {
        enqueueSnackbar("Cập nhật vai trò thành công", { variant: "success" });
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
            { title: "Quản Lý Vai Trò", href: "/admin/users" },
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
              Chi Tiết Vai Trò
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
                Thông Tin Vai Trò
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <AppInput
                    label="Mã vai trò"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <AppInput
                    label="Tên hiển thị"
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <AppInput
                    label="Mô tả"
                    name="description"
                    value={formData.description}
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
                Hệ Thống
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Typography variant="body2" color="text.secondary">
                Guard name: {formData.guard_name}
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
