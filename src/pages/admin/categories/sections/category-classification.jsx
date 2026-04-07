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

export default function CategoryClassification({
  formData,
  setFormData,
  parentCategories,
  handleChange,
}) {
  return (
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
            mb: 2,
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
          label="Đường dẫn hình ảnh (URL)"
          name="image_url"
          value={formData.image_url || ""}
          onChange={handleChange}
          size="small"
        />
      </CardContent>
    </Card>
  );
}
