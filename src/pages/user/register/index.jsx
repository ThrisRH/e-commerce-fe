import React, { useState } from "react";
import { Form, Card, Button, Divider, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/api/auth/auth-lapi";
import { enqueueSnackbar } from "notistack";
import {
  TextField,
  PasswordField,
} from "@/components/common/input/ant-custom-input";

const UserRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    if (values.password !== values.password_confirmation) {
      enqueueSnackbar("Mật khẩu không khớp!", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await register(values);
      if (response?.data) {
        enqueueSnackbar("Đăng ký thành công!", { variant: "success" });
        navigate("/login");
      }
    } catch (error) {
      enqueueSnackbar(error.message || "Đăng ký thất bại", {
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
      <Card title="Tạo tài khoản" style={{ width: 500 }}>
        <Form name="register_form" onFinish={onFinish} layout="vertical">
          <Flex gap={16}>
            <TextField
              label="Họ"
              name="lname"
              rules={[
                { required: true, message: "Không được để trống!" },
                { min: 2, message: "Họ chưa hợp lệ!" },
              ]}
              placeholder="VD: Nguyễn"
            />
            <TextField
              label="Tên"
              name="fname"
              rules={[
                { required: true, message: "Không được để trống!" },
                { min: 2, message: "Tên chưa hợp lệ!" },
              ]}
              placeholder="VD: Văn A"
            />
          </Flex>

          <TextField
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Không được để trống!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
            placeholder="VD: nguyenvan@gmail.com"
          />

          <TextField
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Không được để trống!" },
              {
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
            placeholder="VD: 0987654321"
          />

          <Flex gap={16}>
            <PasswordField
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Không được để trống!" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
              ]}
              placeholder="Tối thiểu 8 ký tự"
            />
            <PasswordField
              label="Xác nhận mật khẩu"
              name="password_confirmation"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Không được để trống!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
              placeholder="Nhập lại mật khẩu"
            />
          </Flex>

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
              Đăng ký
            </Button>
          </Form.Item>

          <Divider
            style={{ borderColor: "var(--neutral-300)", margin: "12px 0" }}
          >
            <span style={{ color: "var(--neutral-500)", fontSize: 13 }}>
              hoặc
            </span>
          </Divider>

          <div
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "var(--neutral-600)",
            }}
          >
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              style={{ color: "var(--primary-main)", fontWeight: 600 }}
            >
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserRegister;
