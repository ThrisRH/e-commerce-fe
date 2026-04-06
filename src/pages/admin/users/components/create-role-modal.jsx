import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import { createRole } from "@/api/users/user-api";
import { enqueueSnackbar } from "notistack";
import { TextField } from "@/components/common/input/ant-custom-input";

const CreateRoleModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await createRole(values);
      enqueueSnackbar("Tạo vai trò mới thành công", { variant: "success" });
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      if (error.errorFields) return;
      enqueueSnackbar(error.message || "Tạo vai trò thất bại", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm Vai Trò Mới"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <TextField
          label="Tên vai trò"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên vai trò" },
            { type: "string", message: "Tên vai trò không hợp lệ" },
          ]}
        />
        <TextField
          label="Tên hiển thị"
          name="display_name"
          rules={[
            { required: true, message: "Vui lòng nhập tên hiển thị" },
            { type: "string", message: "Tên hiển thị không hợp lệ" },
          ]}
        />
        <TextField
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: "Vui lòng nhập mô tả" },
            { type: "string", message: "Mô tả không hợp lệ" },
          ]}
        />
      </Form>
    </Modal>
  );
};

export default CreateRoleModal;
