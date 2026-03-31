import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Steps,
  Typography,
  Space,
  Row,
  Col,
  Divider,
} from "antd";
import { CloudUploadOutlined, CheckCircleFilled } from "@ant-design/icons";
import {
  fetchCategories,
  fetchCategoryById,
} from "@/api/categories/category-lapi";
import { fetchBrands } from "@/api/brands/brand-lapi";
import { fetchAttributes } from "@/api/attributes/attribute-lapi";
import { createProduct } from "@/api/products/product-lapi";
import { enqueueSnackbar } from "notistack";

import InfoStep from "./steps/info-step";
import ClassificationStep from "./steps/classification-step";
import AttributeStep from "./steps/attributes-step";
import PublicStep from "./steps/public-step";

const { Title, Text, Paragraph } = Typography;

const { TextArea } = Input;

const CreateProductModal = ({ visible, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [extraAttributes, setExtraAttributes] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [attrLoading, setAttrLoading] = useState(false);


  useEffect(() => {
    if (visible) {
      loadInitialData();
      form.resetFields();
      setCurrentStep(0);
    }
  }, [visible]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [cats, brs, attrs] = await Promise.all([
        fetchCategories(),
        fetchBrands(),
        fetchAttributes(),
      ]);
      setCategories(Array.isArray(cats) ? cats : []);
      setBrands(Array.isArray(brs) ? brs : []);
      setAttributes(Array.isArray(attrs) ? attrs : []);
    } catch (err) {

      enqueueSnackbar("Error loading labels: " + err.message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onCategoryChange = async (categoryId) => {
    setAttrLoading(true);
    setCategoryAttributes([]);
    setExtraAttributes([]);
    form.setFieldValue("attributes", {});

    try {
      const category = await fetchCategoryById(categoryId);
      setCategoryAttributes(category.attributes || []);
    } catch (err) {
      enqueueSnackbar("Error loading attributes: " + err.message, {
        variant: "error",
      });
    } finally {
      setAttrLoading(false);
    }
  };

  const handleAddExtraAttribute = (attrId) => {
    const attr = attributes.find((a) => a.id === attrId);
    if (!attr) return;
    
    // Check if it's already there
    if (categoryAttributes.some((a) => a.id === attrId) || 
        extraAttributes.some((a) => a.id === attrId)) {
      return;
    }

    setExtraAttributes([...extraAttributes, attr]);
  };


  const steps = [
    { title: "Details", description: "Product info" },
    { title: "Classification", description: "Category and Brand" },
    { title: "Specs", description: "Technical data" },
    { title: "Visibility", description: "Finalize" },
  ];

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields([
          "name",
          "description",
          "price",
          "stock",
          "image_url",
        ]);
      } else if (currentStep === 1) {
        await form.validateFields(["category_id", "brand_id"]);
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const attributes = Object.entries(values.attributes || {})
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== "",
        )
        .map(([id, value]) => ({
          attribute_id: Number(id),
          value: value,
        }));

      const data = {
        ...values,
        attributes: attributes,
        is_active: values.is_active ? 1 : 0,
        slug: values.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      };

      await createProduct(data);
      enqueueSnackbar("Sản phẩm đã được tạo!", { variant: "success" });
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
        Step {currentStep + 1} of {steps.length}
      </Text>
      <div style={{ display: "flex", gap: "8px" }}>
        {currentStep > 0 && (
          <Button onClick={handleBack} disabled={submitting}>
            Back
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={submitting}
          >
            Create Product
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
            Create New Product
          </Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={footer}
      width={720}
      styles={{ body: { padding: "0 24px 24px 24px", minHeight: "400px" } }}
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
          initialValues={{ is_active: true, stock: 10, price: 0 }}
        >
          <InfoStep display={currentStep === 0 ? "block" : "none"} />

          <ClassificationStep
            display={currentStep === 1 ? "block" : "none"}
            loading={loading}
            categories={categories}
            brands={brands}
            onCategoryChange={onCategoryChange}
            categoryAttributes={categoryAttributes}
            extraAttributes={extraAttributes}
            allAttributes={attributes}
            onAddExtraAttribute={handleAddExtraAttribute}
            attrLoading={attrLoading}
          />



          <AttributeStep
            display={currentStep === 2 ? "block" : "none"}
          />


          <PublicStep display={currentStep === 3 ? "block" : "none"} />
        </Form>
      </div>
    </Modal>
  );
};

export default CreateProductModal;
