import { Col, Divider, Form, Input, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Title, Paragraph, Text } = Typography;

export default function AttributeStep({
  display,
  categoryAttributes,
  attrLoading,
}) {
  return (
    <div style={{ display: display }}>
      <Title level={5}>Technical Specifications</Title>
      <Paragraph type="secondary">
        Highlight the technical aspects of your product.
      </Paragraph>
      <Divider />
      <Form.Item name="specs" label="Dynamic Specs (Raw JSON or Text)">
        <TextArea
          rows={4}
          placeholder="Operating System: iOS 17&#10;Processor: A17 Pro chip&#10;Display: 6.7-inch Super Retina XDR"
        />
      </Form.Item>

      {categoryAttributes.length > 0 && (
        <>
          <Divider>Attributes for Category</Divider>
          <Row gutter={[16, 0]}>
            {categoryAttributes.map((attr) => (
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
        </>
      )}
      {attrLoading && <Text type="secondary">Loading attributes...</Text>}
    </div>
  );
}
