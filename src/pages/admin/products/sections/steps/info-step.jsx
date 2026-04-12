import { CloudUploadOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function InfoStep({
  display,
  brands = [],
  categories = [],
  onCategoryChange,
  loading,
}) {
  return (
    <div style={{ display: display }}>
      <Row gutter={24}>
        <Col span={14}>
          <Form.Item
            name="name"
            label="Tên sản phẩm (Master)"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder='VD: "iPhone 15 Pro Max"' />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category_id"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn danh mục"
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
                label="Thương hiệu"
                rules={[
                  { required: true, message: "Vui lòng chọn thương hiệu" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn thương hiệu"
                  loading={loading}
                  options={brands.map((b) => ({
                    label: b.name,
                    value: b.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Mô tả">
            <TextArea
              rows={5}
              placeholder="Mô tả sản phẩm..."
              defaultValue="Đang cập nhật"
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="image_url"
            label="Đường dẫn ảnh đại diện"
            rules={[
              { required: true, message: "Vui lòng cung cấp đường dẫn ảnh" },
            ]}
          >
            <Input prefix={<CloudUploadOutlined />} placeholder="https://..." />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
