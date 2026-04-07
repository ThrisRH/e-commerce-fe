import { CloudUploadOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Row } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function InfoStep({ display }) {
  return (
    <div style={{ display: display }}>
      <Row gutter={24}>
        <Col span={16}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder='Enter a title that describes your product (e.g., "iPhone 15 Pro Max")' />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea
              rows={5}
              placeholder="Tell shoppers about your product..."
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="image_url"
            label="Thumbnail URL"
            rules={[{ required: true, message: "Please provide image URL" }]}
          >
            <Input prefix={<CloudUploadOutlined />} placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (VND)"
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
