import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Form, Input } from "antd";

export default function ProductItemInfo({ productData }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Thông Tin Phiên Bản Hiện Tại (Product Item)
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Form.Item label="ID Phiên Bản (SKU Group)">
              <Input value={productData?.id} disabled />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Form.Item
              name="item_name"
              label="Tên Phiên Bản (Item Name)"
              rules={[{ required: true, message: "Vui lòng nhập tên phiên bản" }]}
            >
              <Input placeholder="VD: RAM laptop Adata (1 x 8GB)" />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Form.Item label="Slug (Đường dẫn)">
              <Input value={productData?.slug} disabled />
            </Form.Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
