import { Col, Divider, Form, Row, Select, Typography, Checkbox } from "antd";

const { Title, Paragraph } = Typography;

export default function CategoryClassificationStep({
  display,
  loading,
  categories,
  attributes = [],
}) {
  return (
    <div style={{ display: display }}>
      <Title level={5}>Classification</Title>
      <Paragraph type="secondary">
        Decide where this category fits in your hierarchy.
      </Paragraph>
      <Divider />
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="parent_id" label="Parent Category (Optional)">
            <Select
              showSearch
              placeholder="Select a parent category"
              loading={loading}
              options={categories.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Divider>Attributes</Divider>
          <Paragraph type="secondary" style={{ fontSize: "12px" }}>
            Select attributes that will be required for products in this category.
          </Paragraph>
        </Col>


        <Col span={18}>
          <Form.Item name="attribute_ids" label="Category Attributes">
            <Select
              mode="multiple"
              placeholder="Select attributes"
              loading={loading}
              options={attributes.map((attr) => ({
                label: attr.name,
                value: attr.id,
              }))}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="is_required"
            label="Required?"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Is Required</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
