import { Card, CardContent, Grid, Switch, Typography } from "@mui/material";
import { Form, Select } from "antd";

export default function CategoryAttributes({ allAttributes }) {
  return (
    <Card
      sx={{ mt: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          Thuộc Tính Danh Mục
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Chọn các thuộc tính mà sản phẩm thuộc danh mục này sẽ có.
        </Typography>

        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 9 }}>
            <Form.Item name="attribute_ids" label="Chọn thuộc tính">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Chọn thuộc tính"
                optionFilterProp="label"
                options={allAttributes.map((attr) => ({
                  label: attr.name,
                  value: attr.id,
                }))}
              />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Form.Item
              name="is_required"
              label="Bắt buộc?"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
