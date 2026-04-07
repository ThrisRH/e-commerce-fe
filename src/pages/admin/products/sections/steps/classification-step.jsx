import { Col, Divider, Form, Row, Select, Typography, Input, Spin, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import AppButton from "@/components/common/buttons/button";

const { Title, Paragraph, Text } = Typography;

export default function ClassificationStep({
  display,
  loading,
  categories,
  brands,
  onCategoryChange,
  categoryAttributes = [],
  extraAttributes = [],
  allAttributes = [],
  onAddExtraAttribute,
  attrLoading,
  categoryId,
}) {
  const navigate = useNavigate();
  const mergedAttributes = [...categoryAttributes, ...extraAttributes];
  
  return (
    <div style={{ display: display }}>
      <Title level={5}>Classify your product</Title>
      <Paragraph type="secondary">
        Adding specific categories and brands helps buyers find your items faster.
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

        <Col span={24}>
          <Divider>Attributes</Divider>
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Select additional attributes or fill the suggested ones for this category.
            </Text>
          </div>
          
          <Form.Item label="Add Extra Attribute">
            <Select
              showSearch
              placeholder="Search and add an attribute"
              options={allAttributes
                .filter((attr) => !mergedAttributes.some((ma) => ma.id === attr.id))
                .map((attr) => ({ label: attr.name, value: attr.id }))}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              onSelect={onAddExtraAttribute}
            />
          </Form.Item>

          {attrLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin tip="Loading attributes..." />
            </div>
          ) : mergedAttributes.length > 0 ? (
            <Row gutter={[16, 0]}>
              {mergedAttributes.map((attr) => (
                <Col span={12} key={attr.id}>
                  <Form.Item
                    name={["attributes", attr.id]}
                    label={`${attr.name} ${attr.unit ? `(${attr.unit})` : ""}`}
                  >
                    <Input placeholder={`Enter ${attr.name.toLowerCase()}`} />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          ) : categoryId ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <Paragraph style={{ marginBottom: 16 }}>
                Danh mục này chưa được thiết lập các thuộc tính đặc trưng.
              </Paragraph>
              <div style={{ maxWidth: "250px", margin: "0 auto" }}>
                <AppButton 
                  label="Thiết lập thuộc tính ngay"
                  onClick={() => navigate(`/admin/categories/${categoryId}`)}
                />
              </div>
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Vui lòng chọn danh mục để xem các thuộc tính"
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

