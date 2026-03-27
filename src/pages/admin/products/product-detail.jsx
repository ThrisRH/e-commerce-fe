import { updateProduct } from "@/api/products/product-lapi";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
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
  Add as PlusIcon,
  Save as SaveIcon,
  Delete as TrashIcon,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import AppButton from "@/components/common/button";
import AppInput from "@/components/common/input";
import useProductDetail from "@/hooks/products/product-detail";
import Loading from "@/components/ui/state/loading";

const PREDEFINED_ATTRIBUTE_UNITS = [
  "GB",
  "TB",
  "MB",
  "MHz",
  "GHz",
  "W",
  "V",
  "kg",
  "mm",
  "cm",
  "inch",
];

export default function ProductDetail() {
  const { id } = useParams();

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const {
    loading,
    formData,
    setFormData,
    originData,
    attributes,
    categories,
    brands,
    loadData,
  } = useProductDetail(id);

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

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [field]: value };
    setFormData((prev) => ({ ...prev, attributes: updatedAttributes }));
  };

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [
        ...prev.attributes,
        {
          id: null,
          name: "",
          value: "",
          unit: "",
        },
      ],
    }));
  };

  const removeAttribute = (index) => {
    const updatedAttributes = formData.attributes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, attributes: updatedAttributes }));
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
        price: formData.price,
        stock: formData.stock,
        is_active: formData.is_active,
        image_url: formData.image_url,
        category_id: formData.category ? formData.category?.id : null,
        brand_id: formData.brand ? formData.brand?.id : null,
        attributes: [
          ...formData.attributes.map((attr) => {
            return {
              attribute_id: attr.id,
              value: attr.value,
            };
          }),
        ],
        specs: formData.specs,
      };

      const changedPayload = getChangedField(originData.normalize(), payload);

      await updateProduct(id, changedPayload);

      enqueueSnackbar("Sản phẩm đã được cập nhật thành công!", {
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
            Chi Tiết Sản Phẩm
          </Typography>
        </Box>
        <Box sx={{ width: 200 }}>
          <AppButton
            disabled={
              saving || JSON.stringify(originData) === JSON.stringify(formData)
            }
            onClick={handleSubmit}
            label={saving ? "Đang lưu..." : "Lưu Thay Đổi"}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Thông Tin Cơ Bản
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <AppInput
                    label="Tên sản phẩm"
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
                    label="Giá (VND)"
                    name="price"
                    value={formData.price || 0}
                    onChange={handleChange}
                    maxLength={12}
                    type="number"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput
                    label="Số lượng tồn kho"
                    type="number"
                    name="stock"
                    value={formData.stock || 0}
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
                    label="Đang kinh doanh"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Mô tả sản phẩm"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card
            sx={{
              mt: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Thông Số Kỹ Thuật (Attributes)
                </Typography>
                <Button
                  startIcon={<PlusIcon />}
                  variant="outlined"
                  size="small"
                  onClick={addAttribute}
                  sx={{ borderRadius: 2 }}
                >
                  Thêm Thông Số
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {formData.attributes &&
                formData.attributes.map((attr, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    sx={{ mb: 2, alignItems: "center" }}
                  >
                    <Grid size={{ xs: 3 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Loại</InputLabel>
                        <Select
                          value={attr.id}
                          label="Loại"
                          onChange={(e) =>
                            handleAttributeChange(index, "id", e.target.value)
                          }
                        >
                          {attributes.map((attribute) => (
                            <MenuItem key={attribute.id} value={attribute.id}>
                              {attribute.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <TextField
                        fullWidth
                        label="Giá trị (VD: 16, Red)"
                        size="small"
                        value={attr.value || ""}
                        onChange={(e) =>
                          handleAttributeChange(index, "value", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Đơn vị / Loại</InputLabel>
                        <Select
                          label="Đơn vị / Loại"
                          value={attr.unit || ""}
                          onChange={(e) =>
                            handleAttributeChange(index, "unit", e.target.value)
                          }
                        >
                          {PREDEFINED_ATTRIBUTE_UNITS.map((unit) => (
                            <MenuItem key={unit} value={unit}>
                              {unit}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <IconButton
                        color="error"
                        onClick={() => removeAttribute(index)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

              {(!formData.attributes || formData.attributes.length === 0) && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", py: 2 }}
                >
                  Chưa có thông số kỹ thuật nào được tạo.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Categories & Brands */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Phân Loại
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Danh Mục</InputLabel>
                <Select
                  label="Danh Mục"
                  value={formData.category?.id || ""}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      category:
                        categories.find((c) => c.id === e.target.value) ||
                        p.category,
                    }))
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Thương Hiệu</InputLabel>
                <Select
                  label="Thương Hiệu"
                  value={formData.brand?.id || ""}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      brand:
                        brands.find((b) => b.id === e.target.value) || p.brand,
                    }))
                  }
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                Hình ảnh sản phẩm
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
                }}
              >
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt={formData.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
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
                sx={{ mt: 2 }}
                size="small"
              />
            </CardContent>
          </Card>

          <Card
            sx={{
              mt: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Thông tin thêm
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {formData.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ngày tạo:{" "}
                {formData.created_at
                  ? new Date(formData.created_at).toLocaleString()
                  : "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cập nhật cuối:{" "}
                {formData.updated_at
                  ? new Date(formData.updated_at).toLocaleString()
                  : "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
