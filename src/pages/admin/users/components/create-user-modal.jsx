import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { createUser } from "@/api/users/user-api";
import { enqueueSnackbar } from "notistack";

const CreateUserModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await createUser(values);
      enqueueSnackbar("Tạo người dùng thành công", { variant: "success" });
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      if (error.errorFields) return; // Form validation error
      enqueueSnackbar(error.message || "Tạo người dùng thất bại", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm Người Dùng Mới"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ roles: ["customer"] }}
      >
        <Form.Item
          name="name"
          label="Tên người dùng"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
        >
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Quyền hạn"
          rules={[{ required: true, message: "Vui lòng chọn quyền" }]}
        >
          <Select mode="multiple" placeholder="Chọn các quyền">
            <Select.Option value="customer">Khách hàng</Select.Option>
            <Select.Option value="staff">Nhân viên</Select.Option>
            <Select.Option value="admin">Quản lý</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
