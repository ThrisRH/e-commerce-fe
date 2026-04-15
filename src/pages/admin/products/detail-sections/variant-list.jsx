import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import {
  Collapse,
  Space,
  Tag,
  Form,
  Input,
  InputNumber,
  Divider,
  Popconfirm,
  Button,
  Flex,
} from "antd";
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import BorderButton from "@/components/common/buttons/border-button";

const { Panel } = Collapse;

export default function VariantList({
  variants,
  onAddVariant,
  onUpdateVariant,
  onDeleteVariant,
  handleVariantFieldChange,
  saving,
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Danh Sách Biến Thể (Variants)
          </Typography>

          <div style={{ width: "200px", textAlign: "right" }}>
            <BorderButton label="Thêm biến thể" onClick={onAddVariant} />
          </div>
        </div>

        <Collapse
          accordion
          expandIcon={({ isActive }) => (
            <ExpandMoreIcon
              style={{
                transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s",
              }}
            />
          )}
          style={{ background: "transparent", border: "none" }}
        >
          {variants.map((variant) => (
            <Panel
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "95%",
                  }}
                >
                  <Space size="middle">
                    <img
                      src={variant.image_url}
                      alt={variant.sku}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <div>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        SKU: {variant.sku}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {variant.id}
                      </Typography>
                    </div>
                  </Space>
                  <Space>
                    {variant.is_default && <Tag color="gold">Mặc định</Tag>}
                    <Tag color="green">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(variant.price)}
                    </Tag>
                    <Tag color="orange">Kho: {variant.stock}</Tag>
                  </Space>
                </div>
              }
              key={variant.id}
              style={{
                marginBottom: 16,
                background: "#fff",
                borderRadius: "12px",
                border: "1px solid #f0f0f0",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "8px 0" }}>
                <Form layout="vertical">
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Form.Item label="SKU">
                        <Input value={variant.sku} disabled />
                      </Form.Item>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Form.Item label="Giá">
                        <InputNumber
                          style={{ width: "100%" }}
                          value={variant.price}
                          onChange={(val) =>
                            handleVariantFieldChange(variant.id, "price", val)
                          }
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Form.Item label="Số lượng tồn kho">
                        <InputNumber
                          style={{ width: "100%" }}
                          value={variant.stock}
                          onChange={(val) =>
                            handleVariantFieldChange(variant.id, "stock", val)
                          }
                        />
                      </Form.Item>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Form.Item label="Ảnh đại diện">
                        <Input
                          value={variant.image_url}
                          onChange={(e) =>
                            handleVariantFieldChange(
                              variant.id,
                              "image_url",
                              e.target.value,
                            )
                          }
                        />
                      </Form.Item>
                    </Grid>
                  </Grid>

                  <Divider plain>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Phân phối thuộc tính
                    </Typography>
                  </Divider>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {variant.attributes?.map((attr, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#f0f2f5",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {attr.attribute_name}:
                        </Typography>
                        <Typography variant="caption">
                          {attr.attribute_value} {attr.attribute_unit || ""}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Form>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <Popconfirm
                    title="Xóa biến thể"
                    description="Bạn có chắc chắn muốn xóa biến thể này không?"
                    onConfirm={() => onDeleteVariant(variant.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button danger ghost disabled={saving}>
                      Xóa Variant
                    </Button>
                  </Popconfirm>
                  <Button
                    type="primary"
                    loading={saving}
                    onClick={() => onUpdateVariant(variant)}
                  >
                    Cập nhật Variant này
                  </Button>
                </div>
              </div>
            </Panel>
          ))}
        </Collapse>
      </CardContent>
    </Card>
  );
}
