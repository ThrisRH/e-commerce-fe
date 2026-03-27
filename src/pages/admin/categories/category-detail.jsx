import { updateCategory } from "@/api/categories/category-lapi";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack as ArrowLeftIcon,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/button";
import AppInput from "@/components/common/input";
import useCategoryDetail from "@/hooks/categories/category-detail";
import Loading from "@/components/ui/state/loading";

export default function CategoryDetail() {
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const {
    loading,
    formData,
    setFormData,
    originData,
    parentCategories,
    loadData,
  } = useCategoryDetail(id);

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const getChangedField = (data, curr) => {
    const changed = {};
    Object.keys(curr).forEach((key) => {
      if (JSON.stringify(data[key]) !== JSON.stringify(curr[key])) {
        changed[key] = curr[key];
      }
    });
    return changed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        is_active: formData.is_active,
        image_url: formData.image_url,
        parent_id: formData.parent_category ? formData.parent_category?.id : null,
        sort_order: formData.sort_order || 0
      };

      // We need to compare with origin data's payload-like representation
      const originPayload = {
        name: originData.name,
        slug: originData.slug,
        description: originData.description,
        is_active: originData.is_active,
        image_url: originData.image_url,
        parent_id: originData.parent_category ? originData.parent_category?.id : null,
        sort_order: originData.sort_order || 0
      };

      const changedPayload = getChangedField(originPayload, payload);

      if (Object.keys(changedPayload).length === 0) {
          enqueueSnackbar("Không có gì thay đổi", { variant: "info" });
          return;
      }

      await updateCategory(id, changedPayload);

      enqueueSnackbar("Danh mục đã được cập nhật thành công!", {
        variant: "success",
      });

      window.location.reload();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ bgcolor: "background.paper", boxShadow: 1 }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Chi Tiết Danh Mục
          </Typography>
        </Box>
        <Box sx={{ width: 200 }}>
          <AppButton
            disabled={saving || JSON.stringify(originData) === JSON.stringify(formData)}
            onClick={handleSubmit}
            label={saving ? "Đang lưu..." : "Lưu Thay Đổi"}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Thông Tin Cơ Bản
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <AppInput
                    label="Tên danh mục"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput
                    label="Đường dẫn (Slug)"
                    name="slug"
                    value={formData.slug || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput
                    label="Thứ tự hiển thị"
                    type="number"
                    name="sort_order"
                    value={formData.sort_order || 0}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.is_active == 1}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            is_active: e.target.checked ? 1 : 0,
                          }))
                        }
                      />
                    }
                    label="Đang kích hoạt"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Mô tả danh mục"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Phân Loại
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Danh Mục Cha</InputLabel>
                <Select
                  label="Danh Mục Cha"
                  value={formData.parent_category?.id || ""}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      parent_category:
                        parentCategories.find((c) => c.id === e.target.value) || null,
                    }))
                  }
                >
                  <MenuItem value="">
                    <em>Không có (Gốc)</em>
                  </MenuItem>
                  {parentCategories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                Hình ảnh đại diện
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  borderRadius: 2,
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "1px dashed",
                  borderColor: "grey.400",
                  mb: 2
                }}
              >
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt={formData.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Không có hình ảnh
                  </Typography>
                )}
              </Box>
              <TextField
                fullWidth
                label="Image URL"
                name="image_url"
                value={formData.image_url || ""}
                onChange={handleChange}
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
