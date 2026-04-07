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
      <Title level={5}>Phân loại</Title>
      <Paragraph type="secondary">
        Xác định vị trí của danh mục này trong cây danh mục của bạn.
      </Paragraph>
      <Divider />
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="parent_id" label="Danh mục cha (Tùy chọn)">
            <Select
              showSearch
              placeholder="Chọn danh mục cha"
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
          <Divider>Thuộc tính</Divider>
          <Paragraph type="secondary" style={{ fontSize: "12px" }}>
            Chọn các thuộc tính sẽ được yêu cầu cho các sản phẩm trong danh mục
            này.
          </Paragraph>
        </Col>

        <Col span={18}>
          <Form.Item name="attribute_ids" label="Thuộc tính danh mục">
            <Select
              mode="multiple"
              placeholder="Chọn thuộc tính"
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
            label="Bắt buộc?"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Yêu cầu</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
