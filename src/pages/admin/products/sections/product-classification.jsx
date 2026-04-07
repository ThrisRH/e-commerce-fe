import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function ProductClassification({
  formData,
  setFormData,
  categories,
  brands,
  handleChange,
}) {
  return (
    <>
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
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
                    categories.find((c) => c.id === e.target.value) || p.category,
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
                  brand: brands.find((b) => b.id === e.target.value) || p.brand,
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

          <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
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
    </>
  );
}
