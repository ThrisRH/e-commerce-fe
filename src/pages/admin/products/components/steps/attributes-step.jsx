import { Col, Divider, Form, Input, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Title, Paragraph, Text } = Typography;

export default function AttributeStep({
  display,
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
          rows={6}
          placeholder="Operating System: iOS 17&#10;Processor: A17 Pro chip&#10;Display: 6.7-inch Super Retina XDR"
        />
      </Form.Item>
    </div>
  );
}

