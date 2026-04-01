import React, { useState } from "react";
import { Form, Card, Button, Checkbox, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/auth/auth-lapi";
import { enqueueSnackbar } from "notistack";
import {
  TextField,
  PasswordField,
} from "@/components/common/input/ant-custom-input";

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);
      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
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
      <Card title="Đăng nhập" style={{ width: 500 }}>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <TextField
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Không được để trống!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
            placeholder="VD: nguyenvan@gmail.com"
          />

          <PasswordField
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Không được để trống!" }]}
            placeholder="Nhập mật khẩu"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Link
              to="/forgot-password"
              style={{ fontSize: 13, color: "var(--primary-main)" }}
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                height: 44,
                background: "var(--primary-main)",
                borderColor: "var(--primary-main)",
                fontWeight: 600,
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Divider style={{ borderColor: "var(--neutral-300)", margin: "12px 0" }}>
            <span style={{ color: "var(--neutral-500)", fontSize: 13 }}>hoặc</span>
          </Divider>

          <div style={{ textAlign: "center", fontSize: 14, color: "var(--neutral-600)" }}>
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              style={{ color: "var(--primary-main)", fontWeight: 600 }}
            >
              Đăng ký ngay
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserLogin;
