import {
  Col,
  Divider,
  Form,
  Row,
  Select,
  Typography,
  Input,
  Spin,
  Button,
  Card,
  InputNumber,
  Space,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { filterAttributeValuesByAttributes } from "@/utils/attribute-utils";

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
}) {
  const mergedAttributes = [...categoryAttributes, ...extraAttributes];
  
  // Filter predefined values to only show those belonging to the category/extra attributes
  const filteredValues = filterAttributeValuesByAttributes(attributeValues, mergedAttributes);

  return (
    <div style={{ display: display }}>
      <Title level={5}>Cấu hình sản phẩm & Phiên bản</Title>
      <Paragraph type="secondary">
        Thiết lập thông số chung và các phiên bản cụ thể (RAM, Dung lượng, v.v.)
      </Paragraph>
      <Divider />

      <Row gutter={24}>
        {/* Step 2.1: MASTER SPECS */}
        <Col span={24}>
          <Divider>Thông số chung (Specs)</Divider>
          <Form.Item label="Thêm thông số gợi ý">
            <Select
              showSearch
              placeholder="Tìm và thêm thông số"
              options={allAttributes
                .filter(
                  (attr) => !mergedAttributes.some((ma) => ma.id === attr.id)
                )
                .map((attr) => ({ label: attr.name, value: attr.id }))}
              onSelect={onAddExtraAttribute}
            />
          </Form.Item>

          {attrLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin tip="Đang tải..." />
            </div>
          ) : (
            <Row gutter={[16, 0]}>
              {mergedAttributes.map((attr) => (
                <Col span={12} key={attr.id}>
                  <Form.Item
                    name={["attributes", attr.id]}
                    label={`${attr.name} ${attr.unit ? `(${attr.unit})` : ""}`}
                  >
                    <Input placeholder={`Nhập giá trị ${attr.name}`} />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          )}
        </Col>

        {/* Step 2.2: CHILDREN (PRODUCT ITEMS) */}
        <Col span={24}>
          <Divider>Danh sách Nhóm Phiên bản</Divider>
          <Form.List name="children">
            {(childFields, { add: addChild, remove: removeChild }) => (
              <>
                {childFields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    style={{ marginBottom: 24, border: "1px solid #d9d9d9" }}
                    title={`Nhóm phiên bản #${name + 1}`}
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
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          label="Tên nhóm phiên bản"
                          rules={[{ required: true, message: "Nhập tên nhóm" }]}
                        >
                          <Input placeholder="VD: RAM laptop Adata (1 x 8GB)" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <div style={{ paddingBottom: 8 }}>
                          <Text strong style={{ fontSize: 13 }}>Đặc tính phân loại (Gán giá trị định sẵn)</Text>
                        </div>
                        <Form.List name={[name, "attributes"]}>
                          {(attrFields, { add: addAttr, remove: removeAttr }) => (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {attrFields.map((attrField) => (
                                <Space key={attrField.key} align="baseline" style={{ display: 'flex' }}>
                                  <Form.Item
                                    {...attrField}
                                    name={[attrField.name, "attribute_value_id"]}
                                    noStyle
                                    rules={[{ required: true, message: "Chọn giá trị" }]}
                                  >
                                    <Select
                                      showSearch
                                      placeholder="Chọn thông số (VD: RAM: 8GB)"
                                      style={{ width: 300 }}
                                      optionFilterProp="children"
                                      filterOption={(input, option) =>
                                        (option?.label?.toString() ?? "").toLowerCase().includes(input.toLowerCase())
                                      }
                                      options={filteredValues.map(v => ({
                                        label: `${v.attribute_name}: ${v.value} ${v.unit || ""}`,
                                        value: v.id
                                      }))}
                                    />
                                  </Form.Item>
                                  <DeleteOutlined onClick={() => removeAttr(attrField.name)} style={{ color: '#ff4d4f' }} />
                                </Space>
                              ))}
                              <Button type="dashed" onClick={() => addAttr()} block icon={<PlusOutlined />} size="small">
                                Thêm đặc tính
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Col>
                    </Row>

                    <Divider plain>Biến thể vật lý (Giá & Kho)</Divider>
                    
                    <Form.List name={[name, "variants"]}>
                      {(varFields, { add: addVar, remove: removeVar }) => (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {varFields.map((varField) => (
                            <div key={varField.key} style={{ background: '#fafafa', padding: 8, borderRadius: 4 }}>
                              <Row gutter={12} align="bottom">
                                <Col span={8}>
                                  <Form.Item {...varField} name={[varField.name, "price"]} label="Giá (VND)" rules={[{ required: true }]}>
                                    <InputNumber style={{ width: '100%' }} min={0} />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item {...varField} name={[varField.name, "stock"]} label="Kho" rules={[{ required: true }]}>
                                    <InputNumber style={{ width: '100%' }} min={0} />
                                  </Form.Item>
                                </Col>
                                <Col span={8}>
                                  <Form.Item {...varField} name={[varField.name, "image_url"]} label="URL Ảnh">
                                    <Input placeholder="https://..." />
                                  </Form.Item>
                                </Col>
                                <Col span={2}>
                                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeVar(varField.name)} />
                                </Col>
                              </Row>
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => addVar({ price: 0, stock: 1 })} block icon={<PlusOutlined />}>
                            Thêm biến thể vật lý
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Card>
                ))}
                
                <Button
                  type="primary"
                  ghost
                  onClick={() => addChild({ name: "", variants: [{ price: 0, stock: 1 }] })}
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
