import { CheckCircleFilled } from "@ant-design/icons";
import { Divider, Form, Row, Space, Switch, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

export default function PublicStep({ display }) {
  return (
    <div style={{ display: display }}>
      <Title level={5}>Chế độ hiển thị</Title>
      <Paragraph type="secondary">
        Quyết định thời điểm hiển thị sản phẩm.
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
          label="Publish Product"
          valuePropName="checked"
        >
          <Switch checkedChildren="Active" unCheckedChildren="Draft" />
        </Form.Item>
        <Space direction="vertical">
          <Text>
            <CheckCircleFilled
              style={{ color: "#52c41a", marginRight: "8px" }}
            />{" "}
            Sẵn sàng hiển thị
          </Text>
        </Space>
      </div>

      <Divider />
      <Title level={5}>Thông tin cơ bản</Title>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldsValue }) => {
          const { name, price, stock } = getFieldsValue();
          return (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Row justify="space-between">
                <Text>Tên sản phẩm:</Text>
                <Text strong>{name}</Text>
              </Row>
              <Row justify="space-between">
                <Text>Giá:</Text>
                <Text strong>{price?.toLocaleString()} VND</Text>
              </Row>
              <Row justify="space-between">
                <Text>Số lượng tồn kho:</Text>
                <Text strong>{stock}</Text>
              </Row>
            </Space>
          );
        }}
      </Form.Item>
    </div>
  );
}
