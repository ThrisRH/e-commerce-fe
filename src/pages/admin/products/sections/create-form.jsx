import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Steps, Typography, Space } from "antd";
import {
  fetchCategories,
  fetchCategoryById,
} from "@/api/categories/category-api";
import { fetchBrands } from "@/api/brands/brand-api";
import {
  fetchAttributes,
  fetchAttributeValues,
} from "@/api/attributes/attribute-api";
import { createProduct } from "@/api/products/product-api";
import { enqueueSnackbar } from "notistack";
import { sortAttributeValues } from "@/utils/attribute-utils";

import InfoStep from "./steps/info-step";
import ClassificationStep from "./steps/classification-step";
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
  const [attributeValues, setAttributeValues] = useState([]);

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
      const [cats, brs, attrs, attrValues] = await Promise.all([
        fetchCategories({ page: 1, limit: 100 }),
        fetchBrands(),
        fetchAttributes(),
        fetchAttributeValues(),
      ]);
      setCategories(Array.isArray(cats.data) ? cats.data : []);
      setBrands(Array.isArray(brs) ? brs : []);
      setAttributes(Array.isArray(attrs) ? attrs : []);
      setAttributeValues(sortAttributeValues(attrValues));
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

    if (
      categoryAttributes.some((a) => a.id === attrId) ||
      extraAttributes.some((a) => a.id === attrId)
    ) {
      return;
    }

    setExtraAttributes([...extraAttributes, attr]);
  };

  const steps = [
    { title: "Thông tin cơ bản", description: "Product info" },
    { title: "Phân loại", description: "Category and Brand" },
    { title: "Hiển thị", description: "Finalize" },
  ];

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields([
          "name",
          "description",
          "image_url",
          "brand_id",
          "category_id",
        ]);
      } else if (currentStep === 1) {
        await form.validateFields(["children"]);
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
    console.log("values", values);
    setSubmitting(true);
    try {
      const specs = Object.entries(values.attributes || {})
        .filter(([_, val]) => val !== undefined && val !== null && val !== "")
        .map(([id, val]) => {
          const attr = attributes.find((a) => a.id === Number(id));
          return {
            attribute_id: Number(id),
            value: val,
            unit: attr?.unit || "",
          };
        });

      // Map products (children) and their variants
      const mappedChildren = (values.children || []).map((child) => ({
        name: child.name,
        attribute_value_id: child.attribute_value_id, // Slug-level identifier
        variants: (child.variants || []).map((v) => ({
          price: v.price,
          stock: v.stock,
          weight: v.weight,
          length: v.length,
          width: v.width,
          height: v.height,
          image_url: v.image_url,
          // Consolidate attributes for this SKU
          attributes: [
            // Include the slug-level attribute from group
            {
              attribute_id: Number(child.main_attribute_id),
              attribute_value_id: Number(child.attribute_value_id),
            },
            // Include SKU-specific extra attributes
            ...(v.extra_attrs || []).map((ea) => ({
              attribute_id: Number(ea.attribute_id),
              attribute_value_id: Number(ea.attribute_value_id),
            })),
          ],
        })),
      }));

      const data = {
        name: values.name,
        description: values.description,
        image_url: values.image_url,
        brand_id: values.brand_id,
        category_id: values.category_id,
        main_attribute_id: values.main_attribute_id,
        weight: values.weight,
        length: values.length,
        width: values.width,
        height: values.height,
        specs: specs,
        children: mappedChildren,
      };

      if (data.children.length === 0) {
        throw new Error("Cần ít nhất một phiên bản sản phẩm (child item)");
      }

      await createProduct(data);
      enqueueSnackbar("Sản phẩm đã được tạo thành công!", {
        variant: "success",
      });
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
            Tiếp tục
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={submitting}
          >
            Thêm sản phẩm
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
            Thêm sản phẩm mới
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
          initialValues={{
            is_active: true,
            children: [{ name: "", variants: [{ price: 0, stock: 1 }] }],
          }}
        >
          <InfoStep
            display={currentStep === 0 ? "block" : "none"}
            brands={brands}
            categories={categories}
            onCategoryChange={onCategoryChange}
            loading={loading}
          />

          <ClassificationStep
            display={currentStep === 1 ? "block" : "none"}
            categoryAttributes={categoryAttributes}
            extraAttributes={extraAttributes}
            allAttributes={attributes}
            attributeValues={attributeValues}
            onAddExtraAttribute={handleAddExtraAttribute}
            attrLoading={attrLoading}
            categoryId={Form.useWatch("category_id", form)}
            form={form}
          />

          <PublicStep display={currentStep === 2 ? "block" : "none"} />
        </Form>
      </div>
    </Modal>
  );
};

export default CreateProductModal;
