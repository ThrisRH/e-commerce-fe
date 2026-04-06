import { CheckCircleFilled } from "@ant-design/icons";
import { Divider, Form, Row, Space, Switch, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

export default function CategoryPublicStep({ display }) {
  return (
    <div style={{ display: display }}>
      <Title level={5}>Hiển thị</Title>
      <Paragraph type="secondary">
        Quyết định khi nào hiển thị danh mục của bạn cho công chúng.
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
          label="Kích hoạt danh mục"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Bản nháp" />
        </Form.Item>
        <Space direction="vertical">
          <Text>
            <CheckCircleFilled
              style={{ color: "#52c41a", marginRight: "8px" }}
            />{" "}
            Logic danh mục đã được xác minh
          </Text>
        </Space>
      </div>

      <Divider />
      <Title level={5}>Tóm tắt</Title>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldsValue }) => {
          const { name, sort_order } = getFieldsValue();
          return (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Row justify="space-between">
                <Text>Tên biểu thị:</Text>
                <Text strong>{name}</Text>
              </Row>
              <Row justify="space-between">
                <Text>Thứ tự sắp xếp:</Text>
                <Text strong>{sort_order}</Text>
              </Row>
            </Space>
          );
        }}
      </Form.Item>
    </div>
  );
}
