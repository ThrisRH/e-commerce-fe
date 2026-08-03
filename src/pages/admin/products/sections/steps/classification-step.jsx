import { Col, Divider, Form, Row, Typography, Spin, Button, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  TextField,
  DropdownField,
  NumberField,
} from "@/components/common/input/ant-custom-input";

const { Title, Paragraph, Text } = Typography;

export default function ClassificationStep({
  display,
  categoryAttributes = [],
  extraAttributes = [],
  allAttributes = [],
  attributeValues = [],
  onAddExtraAttribute,
  attrLoading,
  categoryId,
  form,
}) {
  const mergedAttributes = [...categoryAttributes, ...extraAttributes];

  const getValuesForAttribute = (attributeId) => {
    return attributeValues
      .filter((v) => v.attribute_id === attributeId)
      .map((v) => ({
        label: `${v.value} ${v.unit || ""}`,
        value: v.id,
      }));
  };

  return (
    <div style={{ display: display }}>
      <Title level={5}>Cấu hình sản phẩm & Phiên bản</Title>
      <Paragraph type="secondary">
        Phân nhóm các phiên bản và thiết lập các đặc tính (Slug-level & Thuộc
        tính bổ sung)
      </Paragraph>
      <Divider />

      <Row gutter={24}>
        <Col span={24}>
          <Divider>Thông số kỹ thuật chung (Master Specs)</Divider>
          <DropdownField
            label="Thêm thông số gợi ý"
            showSearch
            placeholder="Tìm và thêm thông số"
            options={allAttributes
              .filter(
                (attr) => !mergedAttributes.some((ma) => ma.id === attr.id),
              )
              .map((attr) => ({ label: attr.name, value: attr.id }))}
            onSelect={onAddExtraAttribute}
            name={undefined}
          />

          {attrLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin tip="Đang tải..." />
            </div>
          ) : (
            <Row gutter={[16, 0]}>
              {mergedAttributes.map((attr) => (
                <Col span={12} key={attr.id}>
                  <TextField
                    name={["attributes", attr.id]}
                    label={`${attr.name} ${attr.unit ? `(${attr.unit})` : ""}`}
                    placeholder={`Nhập giá trị ${attr.name}`}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>

        <Col span={24}>
          <Divider>Danh sách Nhóm Phiên bản</Divider>
          <Form.List name="children">
            {(childFields, { add: addChild, remove: removeChild }) => (
              <>
                {childFields.map(({ key, name, ...restField }) => {
                  const slugAttrId = form.getFieldValue([
                    "children",
                    name,
                    "main_attribute_id",
                  ]);

                  return (
                    <Card
                      key={key}
                      size="small"
                      style={{
                        marginBottom: 32,
                        border: "1px solid #d9d9d9",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                      title={<Text strong>Nhóm phiên bản #{name + 1}</Text>}
                      extra={
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeChild(name)}
                        />
                      }
                    >
                      <Row gutter={16}>
                        <Col span={24}>
                          <TextField
                            {...restField}
                            name={[name, "name"]}
                            label="Tên nhóm phiên bản"
                            rules={[
                              { required: true, message: "Nhập tên nhóm" },
                            ]}
                            placeholder="VD: RAM laptop Adata (1 x 8GB)"
                            size="large"
                          />
                        </Col>
                      </Row>

                      <Divider plain>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          Đặc tính chính (Slug-level)
                        </Text>
                      </Divider>

                      <Row gutter={16} align="bottom">
                        <Col span={12}>
                          <DropdownField
                            {...restField}
                            name={[name, "main_attribute_id"]}
                            label="Thuộc tính"
                            rules={[
                              { required: true, message: "Chọn thuộc tính" },
                            ]}
                            placeholder="Chọn thuộc tính đại diện"
                            options={allAttributes.map((a) => ({
                              label: a.name,
                              value: a.id,
                            }))}
                            onChange={() => {
                              const current = form.getFieldValue("children");
                              current[name].attribute_value_id = undefined;
                              form.setFieldValue("children", current);
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <DropdownField
                            {...restField}
                            name={[name, "attribute_value_id"]}
                            label="Giá trị chủ đạo"
                            rules={[
                              { required: true, message: "Chọn giá trị" },
                            ]}
                            placeholder="Chọn giá trị"
                            options={getValuesForAttribute(slugAttrId)}
                            disabled={!slugAttrId}
                          />
                        </Col>
                      </Row>

                      <Divider plain>Biến thể vật lý (SKU)</Divider>

                      <Form.List name={[name, "variants"]}>
                        {(varFields, { add: addVar, remove: removeVar }) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 16,
                            }}
                          >
                            {varFields.map((varField) => (
                              <div
                                key={varField.key}
                                style={{
                                  background: "#fafafa",
                                  padding: "20px 16px",
                                  borderRadius: 12,
                                  border: "1px solid #e8e8e8",
                                  boxShadow: "inset 0 0 5px rgba(0,0,0,0.02)",
                                }}
                              >
                                <Row gutter={12} align="bottom">
                                  <Col span={8}>
                                    <NumberField
                                      {...varField}
                                      name={[varField.name, "price"]}
                                      label="Giá bán (VND)"
                                      rules={[{ required: true }]}
                                      min={0}
                                      formatter={(value) =>
                                        `${value}`.replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ",",
                                        )
                                      }
                                    />
                                  </Col>
                                  <Col span={6}>
                                    <NumberField
                                      {...varField}
                                      name={[varField.name, "stock"]}
                                      label="Kho hàng"
                                      rules={[{ required: true }]}
                                      min={0}
                                    />
                                  </Col>
                                  <Col span={8}>
                                    <TextField
                                      {...varField}
                                      name={[varField.name, "image_url"]}
                                      label="URL ảnh đại diện"
                                      placeholder="https://..."
                                    />
                                  </Col>
                                  <Col span={2} style={{ textAlign: "right" }}>
                                    <Button
                                      type="text"
                                      danger
                                      icon={<DeleteOutlined />}
                                      onClick={() => removeVar(varField.name)}
                                    />
                                  </Col>
                                </Row>

                                <Row gutter={12} style={{ marginBottom: 16 }}>
                                  <Col span={6}>
                                    <NumberField
                                      {...varField}
                                      name={[varField.name, "weight"]}
                                      label={
                                        <Text
                                          type="secondary"
                                          style={{ fontSize: 12 }}
                                        >
                                          Nặng (kg)
                                        </Text>
                                      }
                                      min={0}
                                      step={0.1}
                                      placeholder="Mặc định"
                                      size="small"
                                    />
                                  </Col>
                                  <Col span={6}>
                                    <NumberField
                                      {...varField}
                                      name={[varField.name, "length"]}
                                      label={
                                        <Text
                                          type="secondary"
                                          style={{ fontSize: 12 }}
                                        >
                                          Dài (mm)
                                        </Text>
                                      }
                                      min={0}
                                      placeholder="Mặc định"
                                      size="small"
                                    />
                                  </Col>
                                  <Col span={6}>
                                    <NumberField
                                      {...varField}
                                      name={[varField.name, "width"]}
                                      label={
                                        <Text
                                          type="secondary"
                                          style={{ fontSize: 12 }}
                                        >
                                          Rộng (mm)
                                        </Text>
                                      }
                                      min={0}
                                      placeholder="Mặc định"
                                      size="small"
                                    />
                                  </Col>
                                  <Col span={6}>
                                    <NumberField
                                      {...varField}
                                      name={[varField.name, "height"]}
                                      label={
                                        <Text
                                          type="secondary"
                                          style={{ fontSize: 12 }}
                                        >
                                          Cao (mm)
                                        </Text>
                                      }
                                      min={0}
                                      placeholder="Mặc định"
                                      size="small"
                                    />
                                  </Col>
                                </Row>

                                <Divider plain style={{ margin: "12px 0" }}>
                                  <Text
                                    style={{ fontSize: 12, fontWeight: 500 }}
                                  >
                                    Thuộc tính chi tiết của SKU
                                  </Text>
                                </Divider>

                                <Form.List
                                  name={[varField.name, "extra_attrs"]}
                                >
                                  {(
                                    skuAttrFields,
                                    { add: addSkuAttr, remove: removeSkuAttr },
                                  ) => (
                                    <>
                                      {skuAttrFields.map((skuAttrField) => (
                                        <Form.Item
                                          noStyle
                                          shouldUpdate={(prev, curr) => {
                                            const prevId =
                                              prev?.children?.[name]
                                                ?.variants?.[varField.name]
                                                ?.extra_attrs?.[
                                                skuAttrField.name
                                              ]?.attribute_id;
                                            const currId =
                                              curr?.children?.[name]
                                                ?.variants?.[varField.name]
                                                ?.extra_attrs?.[
                                                skuAttrField.name
                                              ]?.attribute_id;
                                            return prevId !== currId;
                                          }}
                                          key={skuAttrField.key}
                                        >
                                          {() => {
                                            const selectedAttrId =
                                              form.getFieldValue([
                                                "children",
                                                name,
                                                "variants",
                                                varField.name,
                                                "extra_attrs",
                                                skuAttrField.name,
                                                "attribute_id",
                                              ]);
                                            return (
                                              <Row
                                                gutter={8}
                                                align="middle"
                                                style={{ marginBottom: 8 }}
                                              >
                                                <Col span={11}>
                                                  <DropdownField
                                                    {...skuAttrField}
                                                    name={[
                                                      skuAttrField.name,
                                                      "attribute_id",
                                                    ]}
                                                    placeholder="Thuộc tính"
                                                    options={allAttributes.map(
                                                      (a) => ({
                                                        label: a.name,
                                                        value: a.id,
                                                      }),
                                                    )}
                                                    onChange={() => {
                                                      const current =
                                                        form.getFieldValue(
                                                          "children",
                                                        );
                                                      if (
                                                        current[name]
                                                          ?.variants?.[
                                                          varField.name
                                                        ]?.extra_attrs?.[
                                                          skuAttrField.name
                                                        ]
                                                      ) {
                                                        current[name].variants[
                                                          varField.name
                                                        ].extra_attrs[
                                                          skuAttrField.name
                                                        ].attribute_value_id =
                                                          undefined;
                                                        form.setFieldValue(
                                                          "children",
                                                          current,
                                                        );
                                                      }
                                                    }}
                                                    size="small"
                                                  />
                                                </Col>
                                                <Col span={11}>
                                                  <DropdownField
                                                    {...skuAttrField}
                                                    name={[
                                                      skuAttrField.name,
                                                      "attribute_value_id",
                                                    ]}
                                                    placeholder="Giá trị"
                                                    options={getValuesForAttribute(
                                                      selectedAttrId,
                                                    )}
                                                    disabled={!selectedAttrId}
                                                    size="small"
                                                  />
                                                </Col>
                                                <Col span={2}>
                                                  <Button
                                                    type="text"
                                                    size="small"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() =>
                                                      removeSkuAttr(
                                                        skuAttrField.name,
                                                      )
                                                    }
                                                  />
                                                </Col>
                                              </Row>
                                            );
                                          }}
                                        </Form.Item>
                                      ))}
                                      <Button
                                        type="dashed"
                                        size="small"
                                        icon={<PlusOutlined />}
                                        onClick={() => addSkuAttr()}
                                        block
                                      >
                                        Thêm đặc tính SKU
                                      </Button>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => addVar({ price: 0, stock: 1 })}
                              block
                              icon={<PlusOutlined />}
                            >
                              Thêm biến thể vật lý
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Card>
                  );
                })}

                <Button
                  type="primary"
                  ghost
                  onClick={() =>
                    addChild({ name: "", variants: [{ price: 0, stock: 1 }] })
                  }
                  block
                  icon={<PlusOutlined />}
                  style={{ marginBottom: 32 }}
                >
                  Thêm Nhóm Phiên bản mới
                </Button>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </div>
  );
}
