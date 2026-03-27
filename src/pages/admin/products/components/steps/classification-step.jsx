import { Col, Divider, Form, Row, Select, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function ClassificationStep({
  display,
  loading,
  categories,
  brands,
  onCategoryChange,
}) {
  return (
    <div style={{ display: display }}>
      <Title level={5}>Classify your product</Title>
      <Paragraph type="secondary">
        Adding specific categories and brands helps buyers find your items
        faster.
      </Paragraph>
      <Divider />
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              loading={loading}
              options={categories.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
              onChange={onCategoryChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="brand_id"
            label="Brand"
            rules={[{ required: true, message: "Please select a brand" }]}
          >
            <Select
              showSearch
              placeholder="Select a brand"
              loading={loading}
              options={brands.map((b) => ({
                label: b.name,
                value: b.id,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
