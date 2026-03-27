import { CheckCircleFilled } from "@ant-design/icons";
import { Divider, Form, Row, Space, Switch, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

export default function CategoryPublicStep({ display }) {
  return (
    <div style={{ display: display }}>
      <Title level={5}>Visibility</Title>
      <Paragraph type="secondary">
        Decide when to show your category to the public.
      </Paragraph>
      <Divider />
      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Form.Item
          name="is_active"
          label="Activate Category"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Draft" />
        </Form.Item>
        <Space direction="vertical">
          <Text>
            <CheckCircleFilled
              style={{ color: "#52c41a", marginRight: "8px" }}
            />{" "}
            Category logic verified
          </Text>
        </Space>
      </div>

      <Divider />
      <Title level={5}>Summary</Title>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldsValue }) => {
          const { name, sort_order } = getFieldsValue();
          return (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Row justify="space-between">
                <Text>Name:</Text>
                <Text strong>{name}</Text>
              </Row>
              <Row justify="space-between">
                <Text>Sort Order:</Text>
                <Text strong>{sort_order}</Text>
              </Row>
            </Space>
          );
        }}
      </Form.Item>
    </div>
  );
}
