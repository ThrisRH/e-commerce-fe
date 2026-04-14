import { updateCategory } from "@/api/categories/category-api";
import { Box, Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/buttons/button";
import useCategoryDetail from "@/hooks/categories/category-detail";
import Loading from "@/components/ui/state/loading";
import { Form } from "antd";

import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";

import BasicInfo from "./sections/basic-info";
import CategoryAttributes from "./sections/category-attributes";
import CategoryClassification from "./sections/category-classification";

export default function CategoryDetail() {
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    loading,
    formData,
    setFormData,
    originData,
    parentCategories,
    allAttributes,
    loadData,
  } = useCategoryDetail(id);

  useEffect(() => {
    if (id) loadData();
  }, [id, loadData]);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData,
        parent_id: formData.parent_category?.id || null,
      });
    }
  }, [formData, form]);

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();

      const payload = {
        name: values.name,
        slug: values.slug,
        description: values.description,
        is_active: values.is_active ? 1 : 0,
        image_url: values.image_url,
        parent_id: values.parent_id,
        sort_order: values.sort_order || 0,
        attribute_ids: values.attribute_ids || [],
        is_required: values.is_required || false,
      };

      await updateCategory(id, payload);
      enqueueSnackbar("Danh mục đã được cập nhật thành công!", {
        variant: "success",
      });
      loadData();
    } catch (err) {
      if (err.name === "ValidationError") return;
      enqueueSnackbar(err.message || "Lỗi cập nhật", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  const breadcrumbItems = [
    { title: "Admin", href: "/admin" },
    { title: "Quản Lý Danh Mục", href: "/admin/categories" },
    { title: "Chi Tiết" },
  ];

  const headerExtra = (
    <Box sx={{ width: 220 }}>
      <AppButton
        disabled={saving}
        onClick={handleSubmit}
        label={saving ? "Đang lưu..." : "Lưu Thay Đổi"}
      />
    </Box>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Chi Tiết Danh Mục"
        breadcrumbItems={breadcrumbItems}
        extra={headerExtra}
      />

      <Form form={form} layout="vertical">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <BasicInfo />
            <CategoryAttributes allAttributes={allAttributes} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CategoryClassification parentCategories={parentCategories} />
          </Grid>
        </Grid>
      </Form>
    </PageContainer>
  );
}
