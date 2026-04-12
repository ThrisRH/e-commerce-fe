import { Card, CardContent, Typography, Grid, IconButton, Box } from "@mui/material";
import { Form, Input, Select, Button } from "antd";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function ProductBase({
  brands,
  categoriesList,
  category,
  allAttributes = [],
}) {
  const form = Form.useFormInstance();
  const specs = Form.useWatch("product_specifications", form) || [];
  const selectedIds = specs.map((s) => s?.attribute_id).filter(Boolean);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Thông Tin Sản Phẩm Gốc (Base Product)
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
              rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
            >
              <Input placeholder="VD: iPhone 15 Pro Max" />
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

          <Grid size={{ xs: 12 }}>
            <Form.Item name={["product", "description"]} label="Mô tả">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Grid>

          {/* Integrated Specifications */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }}>Thông Số Kỹ Thuật Chung (Specs)</Divider>
            <Form.List name="product_specifications">
              {(fields, { add, remove }) => (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const currentId = specs[index]?.attribute_id;
                    const availableOptions =
                      allAttributes.filter(
                        (attr) =>
                          !selectedIds.includes(attr.id) || attr.id === currentId,
                      ) || [];

                    return (
                      <div
                        key={key}
                        style={{
                          background: "#f8f9fa",
                          padding: "12px",
                          borderRadius: "8px",
                          border: "1px solid #eee",
                          position: "relative",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => remove(name)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            "&:hover": { color: "error.main" },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>

                        <div style={{ marginBottom: 8, paddingRight: 24 }}>
                          <Form.Item
                            {...restField}
                            name={[name, "attribute_id"]}
                            noStyle
                            rules={[
                              { required: true, message: "Chọn tên thuộc tính" },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn thuộc tính"
                              style={{ width: "100%" }}
                              optionFilterProp="label"
                              options={availableOptions.map((attr) => ({
                                label: attr.name,
                                value: attr.id,
                              }))}
                            />
                          </Form.Item>
                        </div>
                        
                        <div style={{ display: "flex", gap: 8 }}>
                          <div style={{ flex: 1 }}>
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              noStyle
                              rules={[{ required: true, message: "Nhập giá trị" }]}
                            >
                              <Input placeholder="Giá trị" />
                            </Form.Item>
                          </div>
                          <div style={{ width: 80 }}>
                            <Form.Item
                              {...restField}
                              name={[name, "unit"]}
                              noStyle
                            >
                              <Input placeholder="Đơn vị" />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    type="dashed"
                    block
                    icon={<AddIcon />}
                    onClick={() => add()}
                    disabled={selectedIds.length >= (category?.attributes?.length || 0)}
                  >
                    Thêm thông số
                  </Button>
                </div>
              )}
            </Form.List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// Simple internal Divider component since we are using MUI and Antd mix
const Divider = ({ children, sx }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', my: 2, ...sx }}>
    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
    {children && <Typography variant="caption" sx={{ px: 2, color: 'text.secondary', fontWeight: 600 }}>{children}</Typography>}
    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
  </Box>
);
