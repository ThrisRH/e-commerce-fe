import React, { useState } from "react";
import { Form, Typography, Divider, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/auth/auth-lapi";
import { enqueueSnackbar } from "notistack";
import AppInput from "@/components/common/input";

const { Text } = Typography;

const formLabelStyle = { fontWeight: 500, color: "var(--neutral-700)" };

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password, "user");
      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user_role", "user");
      }
      enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(error.message || "Email hoặc mật khẩu không đúng", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 50px",
        margin: "0 auto",
      }}
    >
      <Card title="Login" style={{ width: 650 }}>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <AppInput
              label={"Email"}
              name={"email"}
              value={undefined}
              onChange={undefined}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserLogin;
