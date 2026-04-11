import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Form, Select, Input, Button } from "antd";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function Specifications({ category }) {
  const form = Form.useFormInstance();
  const specs = Form.useWatch("product_specifications", form) || [];
  const selectedIds = specs.map((s) => s?.attribute_id).filter(Boolean);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Thông Số Kỹ Thuật Chung (Specs)
        </Typography>
        <Form.List name="product_specifications">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {fields.map(({ key, name, ...restField }, index) => {
                const currentId = specs[index]?.attribute_id;
                const availableOptions =
                  category?.attributes?.filter(
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
                      <Typography
                        variant="caption"
                        sx={{ mb: 0.5, display: "block", fontWeight: 600 }}
                      >
                        Tên thuộc tính
                      </Typography>
                      <Form.Item
                        {...restField}
                        name={[name, "attribute_id"]}
                        noStyle
                        rules={[
                          { required: true, message: "Chọn tên thuộc tính" },
                        ]}
                      >
                        <Select
                          placeholder="Chọn thuộc tính từ danh mục"
                          style={{ width: "100%" }}
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
                        <Form.Item {...restField} name={[name, "unit"]} noStyle>
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
                disabled={
                  selectedIds.length >= (category?.attributes?.length || 0)
                }
              >
                {selectedIds.length >= (category?.attributes?.length || 0)
                  ? "Đã chọn hết thuộc tính"
                  : "Thêm thông số"}
              </Button>
            </div>
          )}
        </Form.List>
      </CardContent>
    </Card>
  );
}
