import { Form, Input } from "antd";
import "./style.css";

export const TextField = ({ label, name, rules, ...inputProps }) => {
  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Input style={{ fontSize: "12px", padding: "8px" }} {...inputProps} />
    </Form.Item>
  );
};

export const PasswordField = ({ label, name, rules, ...inputProps }) => {
  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules}
    >
      <Input.Password
        style={{ fontSize: "12px", padding: "8px" }}
        {...inputProps}
      />
    </Form.Item>
  );
};
