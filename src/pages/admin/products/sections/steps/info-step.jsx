import { CloudUploadOutlined } from "@ant-design/icons";
import { Col, Row, Divider } from "antd";
import {
  TextField,
  DropdownField,
  NumberField,
  TextAreaField,
} from "@/components/common/input/ant-custom-input";

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
          <TextField
            name="name"
            label="Tên sản phẩm (Master)"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
            placeholder='VD: "iPhone 15 Pro Max"'
          />

          <Row gutter={16}>
            <Col span={12}>
              <DropdownField
                name="category_id"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                showSearch
                placeholder="Chọn danh mục"
                loading={loading}
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                onChange={onCategoryChange}
              />
            </Col>
            <Col span={12}>
              <DropdownField
                name="brand_id"
                label="Thương hiệu"
                rules={[
                  { required: true, message: "Vui lòng chọn thương hiệu" },
                ]}
                showSearch
                placeholder="Chọn thương hiệu"
                loading={loading}
                options={brands.map((b) => ({
                  label: b.name,
                  value: b.id,
                }))}
              />
            </Col>
          </Row>

          <TextAreaField
            name="description"
            label="Mô tả"
            rows={5}
            placeholder="Mô tả sản phẩm..."
            defaultValue="Đang cập nhật"
          />
        </Col>
        <Col span={10}>
          <TextField
            name="image_url"
            label="Đường dẫn ảnh đại diện"
            rules={[
              { required: true, message: "Vui lòng cung cấp đường dẫn ảnh" },
            ]}
            prefix={<CloudUploadOutlined />}
            placeholder="https://..."
          />

          <Divider plain>Thông số vật lý mặc định</Divider>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <NumberField
                name="weight"
                placeholder="2"
                label="Cân nặng (kg)"
                min={0}
                step={0.1}
              />
            </Col>
            <Col span={12}>
              <NumberField
                placeholder="1.2"
                name="length"
                label="Dài (mm)"
                min={0}
              />
            </Col>
            <Col span={12}>
              <NumberField
                placeholder="1.2"
                name="width"
                label="Rộng (mm)"
                min={0}
              />
            </Col>
            <Col span={12}>
              <NumberField
                placeholder="1.2"
                name="height"
                label="Cao (mm)"
                min={0}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
