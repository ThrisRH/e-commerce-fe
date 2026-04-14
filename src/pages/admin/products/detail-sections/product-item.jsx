import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Form } from "antd";
import { TextField } from "@/components/common/input/ant-custom-input";

export default function ProductItemInfo({ productData }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Thông Tin Phiên Bản Hiện Tại
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              name={["product", "id"]}
              label="ID Phiên Bản"
              value={productData?.id}
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="item_name"
              label="Tên Phiên Bản (Item Name)"
              rules={[
                { required: true, message: "Vui lòng nhập tên phiên bản" },
              ]}
              placeholder="VD: RAM laptop Adata (1 x 8GB)"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name={["product", "slug"]}
              label="Slug (Đường dẫn)"
              value={productData?.slug}
              disabled
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
