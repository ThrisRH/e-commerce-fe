import { CloudUploadOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Row } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function CategoryInfoStep({ display }) {
  return (
    <div style={{ display: display }}>
      <Row gutter={24}>
        <Col span={16}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder='Enter category title (e.g., "Laptops")' />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea
              rows={5}
              placeholder="Tell shoppers about this category..."
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="image_url"
            label="Image URL"
            rules={[{ required: true, message: "Please provide image URL" }]}
          >
            <Input prefix={<CloudUploadOutlined />} placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="sort_order"
            label="Sort Order"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
