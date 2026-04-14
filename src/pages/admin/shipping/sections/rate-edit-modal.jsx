import React, { useEffect, useState } from "react";
import { Form, InputNumber, Modal, Typography, message, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { updateShippingRate } from "@/api/shipping/shipping-api";

const { Text } = Typography;

const NumField = ({ label, name, required = false }) => (
  <Form.Item
    label={<Text style={{ fontSize: 13 }}>{label}</Text>}
    name={name}
    rules={required ? [{ required: true }] : []}
    style={{ marginBottom: 12 }}
  >
    <InputNumber
      style={{ width: "100%", height: 40 }}
      controls={false}
      formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      addonAfter="đ"
      min={0}
    />
  </Form.Item>
);

const RateEditModal = ({ rate, open, onClose, onSaved }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && rate) {
      form.setFieldsValue({
        base_fee: rate.base_fee,
        min_fee: rate.min_fee,
        max_fee: rate.max_fee,
      });
    }
  }, [open, rate]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const updated = await updateShippingRate(rate.id, values);
      message.success("Cập nhật thành công!");
      onSaved(updated);
      onClose();
    } catch (err) {
      if (err.name !== "ValidationError") {
        message.error("Cập nhật thất bại.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!rate) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={saving}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ icon: <SaveOutlined /> }}
      width={400}
      title={
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Chỉnh sửa mức phí</div>
          <Text style={{ fontSize: 12, color: "#6b7280", fontWeight: 400 }}>
            {rate.shipping_zone?.name} — {rate.shipping_method?.name}
          </Text>
        </div>
      }
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <NumField label="Phí cơ bản" name="base_fee" required />
        <NumField label="Phí tối thiểu" name="min_fee" />
        <NumField label="Phí tối đa" name="max_fee" />
      </Form>
    </Modal>
  );
};

export default RateEditModal;
