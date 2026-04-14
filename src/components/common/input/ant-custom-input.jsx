import { Form, Input, InputNumber, Select } from "antd";
const { TextArea } = Input;
import "./style.css";

export const TextField = ({ rules = [], label, name, ...inputProps }) => {
  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules ?? []}
    >
      <Input
        style={{ fontSize: "12px", padding: "10px 12px" }}
        {...inputProps}
      />
    </Form.Item>
  );
};

export const NumberField = ({ rules = [], label, name, ...inputProps }) => {
  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules ?? []}
    >
      <InputNumber
        style={{ width: "100%", fontSize: "12px", padding: "10px 12px" }}
        {...inputProps}
      />
    </Form.Item>
  );
};

export const SelectField = ({
  rules = [],
  label = "",
  name,
  noStyle,
  ...inputProps
}) => {
  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules ?? []}
      noStyle={noStyle}
    >
      <Select style={{ width: "100%", fontSize: "12px" }} {...inputProps} />
    </Form.Item>
  );
};

export const TextAreaField = ({ rules = [], label, name, ...inputProps }) => {
  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules ?? []}
    >
      <TextArea
        style={{ fontSize: "12px", padding: "10px 12px" }}
        {...inputProps}
      />
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
        style={{ fontSize: "12px", padding: "10px 12px" }}
        {...inputProps}
      />
    </Form.Item>
  );
};

export const DropdownField = ({
  rules = [],
  label = "",
  name,
  ...inputProps
}) => {
  return (
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      label={label}
      rules={rules ?? []}
    >
      <Select
        style={{ width: "100%", fontSize: "12px", padding: "10px 12px" }}
        {...inputProps}
      />
    </Form.Item>
  );
};
