import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Typography, Space, Flex } from "antd";
import { createStaff, fetchRoles } from "@/api/users/user-api";
import { enqueueSnackbar } from "notistack";
import { InfoCircleOutlined } from "@ant-design/icons";
import { TextField } from "@/components/common/input/ant-custom-input";

const { Text } = Typography;

const CreateUserModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [fetchingRoles, setFetchingRoles] = useState(false);

  useEffect(() => {
    if (visible) {
      setFetchingRoles(true);
      fetchRoles(1, 100)
        .then((res) => {
          const filtered = res.data.filter((r) => r.name !== "n-customer");
          setRoles(filtered);
        })
        .catch((err) => {
          enqueueSnackbar("Lỗi tải danh sách vai trò", { variant: "error" });
        })
        .finally(() => {
          setFetchingRoles(false);
        });
    }
  }, [visible]);

  const generatePassword = (fname, lname, phone) => {
    if (!fname || !lname || !phone) return "";

    const firstName = fname.trim().toLowerCase();
    const lastName = lname.trim().toLowerCase();

    const removeAccents = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    };

    const cleanFirst = removeAccents(firstName);
    const cleanLast = removeAccents(lastName);

    const last2Phone = phone.slice(-2);

    return `${cleanFirst}.${cleanLast}@${last2Phone}`;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const password = generatePassword(
        values.fname,
        values.lname,
        values.phone_number,
      );

      const payload = {
        ...values,
        name: `${values.lname} ${values.fname}`,
        password: password,
      };

      await createStaff(payload);
      enqueueSnackbar(
        `Tạo nhân viên thành công! Mật khẩu mặc định: ${password}`,
        {
          variant: "success",
          autoHideDuration: 10000,
        },
      );
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      if (error.errorFields) return;
      enqueueSnackbar(error.message || "Tạo tài khoản thất bại", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo Tài Khoản Nhân Viên"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Tạo"
      cancelText="Hủy"
      width={500}
    >
      <Form form={form} layout="vertical" initialValues={{ role: undefined }}>
        <Flex gap={16}>
          <TextField
            label="Họ"
            name="lname"
            rules={[{ required: true, message: "Vui lòng nhập họ" }]}
            placeholder="VD: Nguyễn"
          />
          <TextField
            label="Tên"
            name="fname"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            placeholder="VD: Văn A"
          />
        </Flex>

        <TextField
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
          placeholder="VD: thrisx03@gmail.com"
        />

        <TextField
          label="Số điện thoại"
          name="phone_number"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^\d{10}$/, message: "Số điện thoại phải có 10 chữ số" },
          ]}
          placeholder="VD: 0389919233"
        />

        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
        >
          <Select placeholder="Chọn vai trò nhân viên" loading={fetchingRoles}>
            {roles.map((r) => (
              <Select.Option key={r.id} value={r.name}>
                {r.display_name || r.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
