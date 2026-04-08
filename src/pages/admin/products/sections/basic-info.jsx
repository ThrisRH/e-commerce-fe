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
              label="Tên sản phẩm"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              maxLength={255}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <AppInput
              label="Đường dẫn (Slug)"
              name="slug"
              value={formData.slug || ""}
              onChange={handleChange}
              disabled
              maxLength={255}
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
              maxLength={10}
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
              slotProps={{
                htmlInput: {
                  maxLength: 4000,
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
