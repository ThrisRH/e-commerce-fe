import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Divider, Space } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { Box, Paper, Container } from "@mui/material";
import { login } from "@/api/auth/auth-lapi";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

const LoginComponent = ({ isAdmin = false, title = "Sign In" }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const role = isAdmin ? "admin" : "user";
      const response = await login(email, password, role);

      enqueueSnackbar(`${isAdmin ? "Admin" : "User"} login successful!`, {
        variant: "success",
      });

      // Simple token handling example
      if (response && response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user_role", role);
      }

      // Redirect based on role
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar(error.message || "Invalid credentials", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isAdmin 
          ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)" // Dark mode for Admin
          : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", // Light mode for User
        padding: 3,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            padding: { xs: 3, sm: 5 },
            borderRadius: 6,
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
            border: isAdmin ? "1px solid rgba(255,255,255,0.05)" : "none",
            backgroundColor: isAdmin ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              component="img"
              src={isAdmin ? "https://ant.design/assets/logo.svg" : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              sx={{ height: 48, mb: 2, filter: isAdmin ? "brightness(0) invert(1)" : "none" }}
            />
            <Title level={2} style={{ color: isAdmin ? "#fff" : "#111", margin: 0, fontWeight: 700 }}>
              {title}
            </Title>
            <Text type="secondary" style={{ color: isAdmin ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}>
              Welcome back! Please enter your details.
            </Text>
          </Box>

          <Form
            name="auth_login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Email Address"
                style={{
                  borderRadius: 12,
                  backgroundColor: isAdmin ? "#374151" : "#fff",
                  color: isAdmin ? "#fff" : "#000",
                  borderColor: isAdmin ? "#4b5563" : "#d9d9d9",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
              style={{ marginBottom: 12 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Password"
                style={{
                  borderRadius: 12,
                  backgroundColor: isAdmin ? "#374151" : "#fff",
                  borderColor: isAdmin ? "#4b5563" : "#d9d9d9",
                }}
              />
            </Form.Item>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: isAdmin ? "#fff" : "#111" }}>Remember me</Checkbox>
              </Form.Item>
              <Link style={{ color: isAdmin ? "#60a5fa" : "#1677ff" }}>Forgot password?</Link>
            </Box>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  height: 48,
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: "0 4px 14px 0 rgba(0, 118, 255, 0.39)",
                  backgroundColor: isAdmin ? "#3b82f6" : undefined,
                }}
              >
                Sign In
              </Button>
            </Form.Item>

            <Divider plain style={{ margin: "24px 0", color: isAdmin ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }}>
              <Text type="secondary" style={{ color: isAdmin ? "rgba(255,255,255,0.4)" : undefined }}>Or continue with</Text>
            </Divider>

            <Space style={{ width: "100%", justifyContent: "center" }} size="middle">
              <Button 
                icon={<GoogleOutlined />} 
                shape="circle" 
                size="large" 
                style={{
                  backgroundColor: isAdmin ? "#374151" : "#fff",
                  borderColor: isAdmin ? "#4b5563" : "#d9d9d9",
                  color: isAdmin ? "#ef4444" : "#ea4335"
                }} 
              />
              <Button 
                icon={<GithubOutlined />} 
                shape="circle" 
                size="large" 
                style={{
                  backgroundColor: isAdmin ? "#374151" : "#fff",
                  borderColor: isAdmin ? "#4b5563" : "#d9d9d9",
                  color: isAdmin ? "#fff" : "#333"
                }} 
              />
            </Space>

            {!isAdmin && (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Text type="secondary">
                  Don't have an account? <Link href="/register">Sign up for free</Link>
                </Text>
              </Box>
            )}
          </Form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginComponent;
