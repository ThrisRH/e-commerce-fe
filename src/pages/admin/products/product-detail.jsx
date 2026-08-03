import {
  fetchAdminProductDetail,
  updateProduct,
  updateProductItem,
  createVariant,
  updateVariant,
  deleteVariant,
  deleteProduct,
} from "@/api/products/product-api";
import {
  fetchCategoryById,
  fetchCategories,
} from "@/api/categories/category-api";
import { fetchBrands } from "@/api/brands/brand-api";
import {
  fetchAttributes,
  fetchAttributeValues,
} from "@/api/attributes/attribute-api";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Form } from "antd";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/buttons/button";
import { sortAttributeValues } from "@/utils/attribute-utils";

import ProductBase from "./detail-sections/product-base";
import ProductItemInfo from "./detail-sections/product-item";
import VariantList from "./detail-sections/variant-list";
import AddVariantModal from "./detail-sections/add-variant-modal";

import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";
import BorderButton from "@/components/common/buttons/border-button";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [masterForm] = Form.useForm();
  const [addVariantForm] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [productData, setProductData] = useState(null);
  const [localVariants, setLocalVariants] = useState([]);
  const [category, setCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categoryId = Form.useWatch(["product", "category_id"], masterForm);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryById(categoryId)
        .then(setCategory)
        .catch(() =>
          enqueueSnackbar("Lỗi tải thông tin danh mục", { variant: "error" }),
        );
    }
  }, [categoryId]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [data, brandsData, categoriesData, attrValues, allAttrs] =
        await Promise.all([
          fetchAdminProductDetail(slug),
          fetchBrands(),
          fetchCategories({ limit: 100 }),
          fetchAttributeValues(),
          fetchAttributes(),
        ]);

      setProductData(data);
      setLocalVariants(data.variants || []);
      setBrands(Array.isArray(brandsData) ? brandsData : []);
      setCategoriesList(categoriesData.data || []);
      setAttributes(Array.isArray(allAttrs) ? allAttrs : []);
      setAttributeValues(sortAttributeValues(attrValues));

      masterForm.setFieldsValue({
        item_name: data.name,
        name: data.product?.name,
        product: {
          id: data.product?.id,
          brand_id: data.product?.brand?.id,
          category_id: data.product?.category?.id,
          description: data.product?.description || "Đang cập nhật",
        },
        product_specifications: data.product_specifications,
      });

      if (data.product?.category?.id) {
        const catData = await fetchCategoryById(data.product.category.id);
        setCategory(catData);
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  }, [slug, navigate, masterForm]);

  useEffect(() => {
    if (slug) loadData();
  }, [slug, loadData]);

  const handleVariantFieldChange = (id, field, value) => {
    setLocalVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    );
  };

  const onUpdateVariant = async (variant) => {
    try {
      setSaving(true);
      await updateVariant(variant.id, {
        product_item_id: productData.id,
        price: variant.price,
        image_url: variant.image_url,
        stock: variant.stock,
        attributes:
          variant.attributes?.map((attr) => ({
            attribute_value_id: attr.attribute_value_id || attr.id,
          })) || [],
      });
      enqueueSnackbar(`Variant ${variant.sku} đã được cập nhật!`, {
        variant: "success",
      });
      loadData();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const onCreateVariant = async (values) => {
    try {
      setSaving(true);
      await createVariant({
        product_item_id: productData.id,
        price: values.price,
        image_url: values.image_url,
        stock: values.stock,
        attributes: (values.attributes || []).map((attr) => ({
          attribute_value_id: attr.attribute_value_id,
          attribute_id: attr.attribute_id,
          value: attr.value,
          unit: attr.unit,
        })),
      });
      enqueueSnackbar("Variant mới đã tạo thành công!", { variant: "success" });
      setIsAddModalOpen(false);
      addVariantForm.resetFields();
      loadData();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const onDeleteVariant = async (id) => {
    try {
      setSaving(true);
      await deleteVariant(id);
      enqueueSnackbar("Đã xóa variant thành công!", { variant: "success" });
      loadData();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const onDeleteMasterProduct = async (id) => {
    try {
      setSaving(true);
      await deleteProduct(id);
      enqueueSnackbar("Đã xóa sản phẩm thành công!", { variant: "success" });
      navigate("/admin/products");
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMaster = async () => {
    try {
      setSaving(true);
      const values = await masterForm.validateFields();

      await Promise.all([
        updateProduct(productData.product.id, {
          name: values.name,
          brand_id: values.product.brand_id,
          category_id: values.product.category_id,
          description: values.product.description,
          specs: (values.product_specifications || []).map((s) => ({
            attribute_id: s.attribute_id,
            value: s.value,
            unit: s.unit || null,
          })),
        }),
        updateProductItem(productData.id, {
          name: values.item_name,
        }),
      ]);

      enqueueSnackbar("Đã cập nhật thông tin sản phẩm và phiên bản!", {
        variant: "success",
      });
      loadData();
    } catch (err) {
      enqueueSnackbar(
        "Lỗi cập nhật: " + (err.response?.data?.message || err.message),
        { variant: "error" },
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!productData) return null;

  const headerActions = (
    <Box sx={{ display: "flex", gap: 2 }}>
      <BorderButton
        label="Xóa sản phẩm"
        onClick={() => onDeleteMasterProduct(productData.product.id)}
      />
      <AppButton
        disabled={saving}
        onClick={handleUpdateMaster}
        label={saving ? "Đang lưu..." : "Lưu Thay Đổi"}
        width="160px"
      />
    </Box>
  );

  return (
    <PageContainer>
      <PageHeader
        title={productData.name}
        subtitle={`ID Gốc: ${productData.product?.id}`}
        onBack={true}
        extra={headerActions}
        breadcrumbItems={undefined}
      />

      <Form form={masterForm} layout="vertical">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ProductBase
              brands={brands}
              categoriesList={categoriesList}
              category={category}
              allAttributes={attributes}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <ProductItemInfo productData={productData} />
              <VariantList
                onAddVariant={() => setIsAddModalOpen(true)}
                variants={localVariants}
                onUpdateVariant={onUpdateVariant}
                onDeleteVariant={onDeleteVariant}
                handleVariantFieldChange={handleVariantFieldChange}
                saving={saving}
              />
            </Box>
          </Grid>
        </Grid>
      </Form>

      <AddVariantModal
        open={isAddModalOpen}
        form={addVariantForm}
        onCancel={() => setIsAddModalOpen(false)}
        onFinish={onCreateVariant}
        saving={saving}
        category={category}
        attributes={attributes}
        attributeValues={attributeValues}
      />
    </PageContainer>
  );
}
