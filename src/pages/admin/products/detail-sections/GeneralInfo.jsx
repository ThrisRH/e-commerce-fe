import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Form, Input, Select } from "antd";

export default function GeneralInfo({ brands, categoriesList }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Thông Tin Chung
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Form.Item name={["product", "id"]} label="ID Sản Phẩm Gốc">
              <Input disabled />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Form.Item
              name="name"
              label="Tên Dòng Sản Phẩm (Master)"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm" },
              ]}
            >
              <Input />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Form.Item
              name="item_name"
              label="Tên Phiên Bản (Item)"
              rules={[
                { required: true, message: "Vui lòng nhập tên phiên bản" },
              ]}
            >
              <Input />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Form.Item name={["product", "brand_id"]} label="Nhãn hàng">
              <Select
                showSearch
                style={{ width: "100%" }}
                options={brands.map((b) => ({ label: b.name, value: b.id }))}
              />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Form.Item name={["product", "category_id"]} label="Danh mục">
              <Select
                showSearch
                style={{ width: "100%" }}
                options={categoriesList.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
              />
            </Form.Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
