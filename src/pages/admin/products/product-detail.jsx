import {
  fetchAdminProductDetail,
  updateProduct,
  createVariant,
  updateVariant,
  deleteVariant,
} from "@/api/products/product-api";
import {
  fetchCategoryById,
  fetchCategories,
} from "@/api/categories/category-api";
import { fetchBrands } from "@/api/brands/brand-api";
import {
  Box,
  Container,
  IconButton,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  ArrowBack as ArrowLeftIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Form, Button } from "antd";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/buttons/button";

// Section Components
import GeneralInfo from "./detail-sections/GeneralInfo";
import Specifications from "./detail-sections/Specifications";
import VariantList from "./detail-sections/VariantList";
import AddVariantModal from "./detail-sections/AddVariantModal";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categoryId = Form.useWatch(["product", "category_id"], masterForm);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryById(categoryId)
        .then(setCategory)
        .catch((err) => enqueueSnackbar("Lỗi tải thông tin danh mục", { variant: "error" }));
    }
  }, [categoryId]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [data, brandsData, categoriesData] = await Promise.all([
        fetchAdminProductDetail(slug),
        fetchBrands(),
        fetchCategories({ limit: 100 }),
      ]);

      setProductData(data);
      setLocalVariants(data.variants || []);
      // @ts-ignore
      setBrands(brandsData);
      setCategoriesList(categoriesData.data || []);

      // Initialize master form
      masterForm.setFieldsValue({
        item_name: data.name, // The specific item, e.g., "iPhone Air 256 GB"
        name: data.product?.name, // The master product, e.g., "iPhone Air"
        product: {
          ...data.product,
          brand_id: data.product.brand?.id,
          category_id: data.product.category?.id,
        },
        product_specifications: data.product_specifications,
      });

      if (data.product?.category_id) {
        const catData = await fetchCategoryById(data.product.category_id);
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

  const handleUpdateMaster = async () => {
    try {
      setSaving(true);
      const values = await masterForm.validateFields();
      await updateProduct(productData.product.id, {
        name: values.name,
        brand_id: values.product.brand_id,
        category_id: values.product.category_id,
        specifications: values.product_specifications,
      });
      enqueueSnackbar("Đã cập nhật thông tin sản phẩm!", {
        variant: "success",
      });
      loadData();
    } catch (err) {
      enqueueSnackbar("Vui lòng kiểm tra lại thông tin", { variant: "error" });
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
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
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {productData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Slug: {productData.slug}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button icon={<AddIcon />} onClick={() => setIsAddModalOpen(true)}>
            Thêm Variant
          </Button>
          <AppButton
            disabled={saving}
            onClick={handleUpdateMaster}
            label={saving ? "Đang lưu..." : "Lưu Thay Đổi"}
            width="160px"
          />
        </Box>
      </Box>

      <Form form={masterForm} layout="vertical">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <GeneralInfo brands={brands} categoriesList={categoriesList} />
              <Specifications category={category} />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <VariantList
              variants={localVariants}
              onUpdateVariant={onUpdateVariant}
              onDeleteVariant={onDeleteVariant}
              handleVariantFieldChange={handleVariantFieldChange}
              saving={saving}
            />
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
      />
    </Container>
  );
}
