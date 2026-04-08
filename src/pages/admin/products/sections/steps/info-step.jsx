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
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder='Nhập tên sản phẩm (VD: "iPhone 15 Pro Max")' />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea rows={5} placeholder="Mô tả sản phẩm..." />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="image_url"
            label="Đường dẫn ảnh"
            rules={[
              { required: true, message: "Vui lòng cung cấp đường dẫn ảnh" },
            ]}
          >
            <Input prefix={<CloudUploadOutlined />} placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá (VND)"
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
          <Form.Item name="stock" label="Tồn kho" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
