import { Box, Card, CardContent, Typography } from "@mui/material";
import { Form, Select } from "antd";
import { TextField } from "@/components/common/input/ant-custom-input";

export default function CategoryClassification({ parentCategories }) {
  const form = Form.useFormInstance();
  const imageUrl = Form.useWatch("image_url", form);
  const categoryName = Form.useWatch("name", form);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Phân Loại & Hình Ảnh
        </Typography>

        <Form.Item name="parent_id" label="Danh Mục Cha">
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Chọn danh mục cha"
            optionFilterProp="label"
            allowClear
            options={[
              { label: "Không có (Gốc)", value: null },
              ...parentCategories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            ]}
          />
        </Form.Item>

        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "text.secondary" }}
          >
            Xem trước hình ảnh
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
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={categoryName}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Chưa có hình ảnh
              </Typography>
            )}
          </Box>
          <TextField
            label="Đường dẫn hình ảnh (URL)"
            name="image_url"
            placeholder="https://..."
          />
        </Box>
      </CardContent>
    </Card>
  );
}
