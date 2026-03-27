import { Col, Divider, Form, Row, Select, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function CategoryClassificationStep({
  display,
  loading,
  categories,
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
          <Form.Item
            name="parent_id"
            label="Parent Category (Optional)"
          >
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
      </Row>
    </div>
  );
}
