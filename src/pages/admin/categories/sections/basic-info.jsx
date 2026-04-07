import { Card, CardContent, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import AppInput from "@/components/common/input";

export default function BasicInfo({ formData, handleChange, setFormData }) {
  return (
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
  );
}
