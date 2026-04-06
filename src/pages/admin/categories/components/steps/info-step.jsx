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
            label="Tên Danh Mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder='Nhập tên danh mục (VD: "Máy tính xách tay")' />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea
              rows={5}
              placeholder="Mô tả về danh mục này cho khách hàng..."
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="image_url"
            label="Đường dẫn ảnh (URL)"
            rules={[{ required: true, message: "Vui lòng nhập đường dẫn ảnh" }]}
          >
            <Input prefix={<CloudUploadOutlined />} placeholder="https://..." />
          </Form.Item>
          <Form.Item
            name="sort_order"
            label="Thứ tự sắp xếp"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
