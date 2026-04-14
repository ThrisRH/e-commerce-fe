import { Card, CardContent, Grid, Switch, Typography } from "@mui/material";
import { Form, Input } from "antd";
import { TextField } from "@/components/common/input/ant-custom-input";

export default function BasicInfo() {
  return (
    <Card
      sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 3 }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Thông Tin Cơ Bản
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Tên danh mục"
              name="name"
              rules={[{ required: true, message: "Nhập tên danh mục" }]}
              maxLength={255}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Đường dẫn (Slug)" name="slug" disabled />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Thứ tự hiển thị"
              type="number"
              name="sort_order"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Form.Item
              name="is_active"
              label="Trạng thái"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Form.Item name="description" label="Mô tả danh mục">
              <Input.TextArea rows={4} maxLength={1000} />
            </Form.Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
