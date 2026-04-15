import { IconButton, Typography, Grid } from "@mui/material";
import {
  Form,
  Modal,
  Input,
  InputNumber,
  Divider,
  Space,
  Tag,
  Button,
  Select,
} from "antd";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { filterAttributeValuesByAttributes } from "@/utils/attribute-utils";

export default function AddVariantModal({
  open,
  onCancel,
  onFinish,
  saving,
  category,
  form,
  attributes = [],
  attributeValues = [],
}) {
  const filteredValues = filterAttributeValuesByAttributes(
    attributeValues,
    category?.attributes || [],
  );

  return (
    <Modal
      title="Thêm Biến Thể Mới"
      open={open}
      onCancel={onCancel}
      width={650}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ stock: 0, price: 0, attributes: [{}] }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Form.Item
              name="price"
              label="Giá bán (VND)"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Form.Item
              name="stock"
              label="Số lượng tồn kho"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Grid>
        </Grid>

        <Form.Item
          name="image_url"
          label="Đường dẫn ảnh"
          rules={[{ required: true, message: "Vui lòng nhập URL ảnh!" }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <Divider plain>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Cấu hình thuộc tính
          </Typography>
        </Divider>

        <Form.List name="attributes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    background: "#f9f9f9",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: 12,
                    position: "relative",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <Form.Item
                        {...restField}
                        name={[name, "attribute_value_id"]}
                        label="Giá trị định sẵn (Chọn từ thư viện)"
                      >
                        <Select
                          showSearch
                          placeholder="Tìm thông số (VD: RAM: 16GB)"
                          style={{ width: "100%" }}
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            (option?.label?.toString() ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={filteredValues.map((v) => ({
                            label: `${v.attribute_name}: ${v.value} ${v.unit || ""}`,
                            value: v.id,
                          }))}
                        />
                      </Form.Item>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Divider
                        plain
                        style={{
                          margin: "8px 0",
                          fontSize: "11px",
                          color: "#8c8c8c",
                        }}
                      >
                        Hoặc nhập giá trị mới
                      </Divider>
                    </Grid>

                    <Grid size={{ xs: 4 }}>
                      <Form.Item
                        {...restField}
                        name={[name, "attribute_id"]}
                        label="Thuộc tính"
                      >
                        <Select
                          placeholder="Chọn tt"
                          style={{ width: "100%" }}
                          options={category?.attributes?.map((attr) => ({
                            label: attr.name,
                            value: attr.id,
                          }))}
                        />
                      </Form.Item>
                    </Grid>
                    <Grid size={{ xs: 5 }}>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        label="Giá trị"
                      >
                        <Input placeholder="Giá trị" />
                      </Form.Item>
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                      <Form.Item
                        {...restField}
                        name={[name, "unit"]}
                        label="Đơn vị"
                      >
                        <Input placeholder="Unit" />
                      </Form.Item>
                    </Grid>
                  </Grid>
                  {fields.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => remove(name)}
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        bgcolor: "white",
                        border: "1px solid #ddd",
                        "&:hover": { bgcolor: "#fff1f0", color: "red" },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<AddIcon />}
              >
                Thêm thuộc tính
              </Button>
            </>
          )}
        </Form.List>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 24,
          }}
        >
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={saving}>
            Tạo Biến Thể
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
