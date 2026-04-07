import { updateProduct } from "@/api/products/product-api";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ArrowBack as ArrowLeftIcon,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/buttons/button";
import useProductDetail from "@/hooks/products/product-detail";
import Loading from "@/components/ui/state/loading";

// Import sections
import BasicInfo from "./sections/basic-info";
import ProductAttributes from "./sections/product-attributes";
import ProductClassification from "./sections/product-classification";

export default function ProductDetail() {
  const { id } = useParams();

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const {
    loading,
    formData,
    setFormData,
    originData,
    attributes,
    categories,
    brands,
    loadData,
  } = useProductDetail(id);

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

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [field]: value };
    setFormData((prev) => ({ ...prev, attributes: updatedAttributes }));
  };

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [
        ...prev.attributes,
        {
          id: null,
          name: "",
          value: "",
          unit: "",
        },
      ],
    }));
  };

  const removeAttribute = (index) => {
    const updatedAttributes = formData.attributes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, attributes: updatedAttributes }));
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
        price: formData.price,
        stock: formData.stock,
        is_active: formData.is_active,
        image_url: formData.image_url,
        category_id: formData.category ? formData.category?.id : null,
        brand_id: formData.brand ? formData.brand?.id : null,
        attributes: [
          ...formData.attributes.map((attr) => {
            return {
              attribute_id: attr.id,
              value: attr.value,
            };
          }),
        ],
        specs: formData.specs,
      };

      const changedPayload = getChangedField(originData.normalize(), payload);

      await updateProduct(id, changedPayload);

      enqueueSnackbar("Sản phẩm đã được cập nhật thành công!", {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ bgcolor: "background.paper", boxShadow: 1 }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Chi Tiết Sản Phẩm
          </Typography>
        </Box>
        <Box sx={{ width: 200 }}>
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
          <ProductAttributes 
            formData={formData} 
            attributes={attributes} 
            handleAttributeChange={handleAttributeChange} 
            addAttribute={addAttribute} 
            removeAttribute={removeAttribute} 
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ProductClassification 
            formData={formData} 
            setFormData={setFormData} 
            categories={categories} 
            brands={brands} 
            handleChange={handleChange} 
          />
        </Grid>
      </Grid>
    </Container>
  );
}
