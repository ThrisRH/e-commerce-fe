import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Steps, Typography, Space } from "antd";
import { fetchCategories, createCategory } from "@/api/categories/category-api";
import { fetchAttributes } from "@/api/attributes/attribute-api";
import { enqueueSnackbar } from "notistack";

import InfoStep from "./steps/info-step";
import ClassificationStep from "./steps/classification-step";
import PublicStep from "./steps/public-step";

const { Text } = Typography;

const CreateCategoryModal = ({ visible, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (visible) {
      loadInitialData();
      form.resetFields();
      form.setFieldsValue({
        is_active: true,
        sort_order: 0,
      });
      setCurrentStep(0);
    }
  }, [visible]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [cats, attrs] = await Promise.all([
        fetchCategories({ page: 1, limit: 100 }),
        fetchAttributes(),
      ]);
      setCategories(Array.isArray(cats) ? cats : []);
      setAttributes(Array.isArray(attrs) ? attrs : []);
    } catch (err) {
      enqueueSnackbar("Lỗi tải danh mục: " + err.message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Chi tiết", description: "Thông tin danh mục" },
    { title: "Phân loại", description: "Cấp bậc" },
    { title: "Hiển thị", description: "Hoàn tất" },
  ];

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields([
          "name",
          "description",
          "image_url",
          "sort_order",
        ]);
      } else if (currentStep === 1) {
        await form.validateFields(["parent_id"]);
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {}
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const data = {
        ...values,
        is_active: values.is_active ? 1 : 0,
        slug: values.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      };

      await createCategory(data);
      enqueueSnackbar("Danh mục đã được tạo!", { variant: "success" });
      onSuccess();
      onClose();
    } catch (error) {
      enqueueSnackbar("Thêm thất bại: " + error.message, { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const footer = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
      }}
    >
      <Text type="secondary" style={{ fontSize: "12px" }}>
        Bước {currentStep + 1} / {steps.length}
      </Text>
      <div style={{ display: "flex", gap: "8px" }}>
        {currentStep > 0 && (
          <Button onClick={handleBack} disabled={submitting}>
            Quay lại
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button type="primary" onClick={handleNext}>
            Tiếp theo
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={submitting}
          >
            Tạo Danh Mục
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      title={
        <Space
          direction="horizontal"
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Text strong style={{ fontSize: "18px" }}>
            Tạo Danh Mục Mới
          </Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={footer}
      width={720}
      styles={{ body: { padding: "0 24px 24px 24px", minHeight: "350px" } }}
      maskClosable={false}
      centered
    >
      <div style={{ padding: "24px 0" }}>
        <Steps
          current={currentStep}
          size="small"
          labelPlacement="vertical"
          style={{ marginBottom: "32px" }}
          items={steps.map((item) => ({
            title: item.title,
            description: item.description,
          }))}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ is_active: true, sort_order: 0 }}
        >
          <InfoStep display={currentStep === 0 ? "block" : "none"} />

          <ClassificationStep
            display={currentStep === 1 ? "block" : "none"}
            loading={loading}
            categories={categories}
            attributes={attributes}
          />

          <PublicStep display={currentStep === 2 ? "block" : "none"} />
        </Form>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
