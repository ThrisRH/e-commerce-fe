import { fetchBrands } from "@/api/brands/brand-api";
import {
  fetchCategories,
  fetchCategoryById,
} from "@/api/categories/category-api";
import { fetchProductBySlug } from "@/api/products/product-api";
import Brand from "@/models/brand";
import Category from "@/models/category";
import { Product } from "@/models/product";
import { enqueueSnackbar } from "notistack";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useProductDetail(id) {
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState(new Product());
  
  const [originData, setOriginData] = useState(new Product());
  const [attributes, setAttributes] = useState([]);
  
  const [categories, setCategories] = useState([]);
  
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const productData = await fetchProductBySlug(id);
      if (productData == null) {
        enqueueSnackbar("Không tìm thấy sản phẩm", { variant: "error" });
        navigate("/admin/products");
        return;
      }
      const [categoriesList, brandData, categoryData] = await Promise.all([
        fetchCategories({ page: 1, limit: 100 }),
        fetchBrands(),
        fetchCategoryById(productData.category.id),
      ]);

      setFormData(new Product(productData));
      setOriginData(new Product(productData));
      setCategories(
        Array.isArray(categoriesList.data)
          ? categoriesList.data
          : [categoriesList],
      );
      setBrands(Array.isArray(brandData) ? brandData : [brandData]);
      setAttributes(categoryData.attributes);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  return {
    loading,
    formData,
    setFormData,
    originData,
    attributes,
    categories,
    brands,
    loadData,
  };
}
