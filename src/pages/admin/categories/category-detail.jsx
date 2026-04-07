import { updateCategory } from "@/api/categories/category-api";
import { Box, Container, Grid } from "@mui/material";

import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/buttons/button";
import useCategoryDetail from "@/hooks/categories/category-detail";
import Loading from "@/components/ui/state/loading";

import { Breadcrumb, Typography as AntdTypography } from "antd";

import BasicInfo from "./sections/basic-info";
import CategoryAttributes from "./sections/category-attributes";
import CategoryClassification from "./sections/category-classification";

const { Title: AntdTitle } = AntdTypography;

export default function CategoryDetail() {
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const getChangedField = (data, curr) => {
    const changed = {};
    Object.keys(curr).forEach((key) => {
      if (JSON.stringify(data[key]) !== JSON.stringify(curr[key])) {
        changed[key] = curr[key];
      }
    });
    return changed;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    try {
      setSaving(true);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        is_active: formData.is_active,
        image_url: formData.image_url,
        parent_id: formData.parent_category
          ? formData.parent_category?.id
          : null,
        sort_order: formData.sort_order || 0,
        attribute_ids: formData.attribute_ids || [],
        is_required: formData.is_required || false,
      };

      const originPayload = {
        name: originData.name,
        slug: originData.slug,
        description: originData.description,
        is_active: originData.is_active,
        image_url: originData.image_url,
        parent_id: originData.parent_category
          ? originData.parent_category?.id
          : null,
        sort_order: originData.sort_order || 0,
        attribute_ids: originData.attribute_ids || [],
        is_required: originData.is_required || false,
      };

      const changedPayload = getChangedField(originPayload, payload);

      if (Object.keys(changedPayload).length === 0) {
        enqueueSnackbar("Không có thay đổi nào được thực hiện", {
          variant: "info",
        });
        return;
      }

      await updateCategory(id, changedPayload);

      enqueueSnackbar("Danh mục đã được cập nhật thành công!", {
        variant: "success",
      });

      window.location.reload();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Breadcrumb
            items={[
              { title: "Admin", href: "/admin" },
              { title: "Quản Lý Danh Mục", href: "/admin/categories" },
              { title: "Chi Tiết" },
            ]}
          />
          <AntdTitle level={2} style={{ margin: "8px 0 0" }}>
            Chi Tiết Danh Mục
          </AntdTitle>
        </Box>
        <Box sx={{ width: 220 }}>
          <AppButton
            disabled={
              saving || JSON.stringify(originData) === JSON.stringify(formData)
            }
            onClick={handleSubmit}
            label={saving ? "Đang lưu..." : "Lưu Thay Đổi"}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <BasicInfo
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
          <CategoryAttributes
            formData={formData}
            setFormData={setFormData}
            allAttributes={allAttributes}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CategoryClassification
            formData={formData}
            setFormData={setFormData}
            parentCategories={parentCategories}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
