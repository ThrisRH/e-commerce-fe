import { fetchBrands } from "@/api/brands/brand-lapi";
import {
  fetchCategories,
  fetchCategoryById,
} from "@/api/categories/category-lapi";
import { fetchProductById } from "@/api/products/product-lapi";
import Brand from "@/models/brand";
import Category from "@/models/category";
import { Product } from "@/models/product";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useProductDetail(id) {
  const [loading, setLoading] = useState(true);
  /** @type {[Product, Function]} */
  const [formData, setFormData] = useState(new Product());
  /** @type {[Product, Function]} */
  const [originData, setOriginData] = useState(new Product());
  const [attributes, setAttributes] = useState([]);
  /** @type {[Category[], Function]} */
  const [categories, setCategories] = useState([]);
  /** @type {[Brand[], Function]} */
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);

      const productData = await fetchProductById(id);
      if (productData == null) {
        enqueueSnackbar("Không tìm thấy sản phẩm", { variant: "error" });
        navigate("/admin/products");
        return;
      }
      const [categoriesList, brandData, categoryData] = await Promise.all([
        fetchCategories(),
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

      console.log("categoryData: ", categoryData);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

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
