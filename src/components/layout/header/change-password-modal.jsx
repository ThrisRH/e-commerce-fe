import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "@/api/auth/auth-api";
import { enqueueSnackbar } from "notistack";

const ChangePasswordModal = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      enqueueSnackbar("Mật khẩu không khớp!", { variant: "error" });
    }
    setLoading(true);
    try {
      await changePassword(token, {
        old_password: values.currentPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmPassword,
      });
      enqueueSnackbar("Đổi mật khẩu thành công!", { variant: "success" });
      form.resetFields();
      onClose();
    } catch (error) {
      enqueueSnackbar(error.message || "Đổi mật khẩu thất bại", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="currentPassword"
          label="Mật khẩu hiện tại"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải từ 6 ký tự" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp"),
                );
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%", height: 40, borderRadius: 8 }}
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
