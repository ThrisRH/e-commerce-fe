import {
  fetchCategories,
  fetchCategoryById,
} from "@/api/categories/category-lapi";
import Category from "@/models/category";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCategoryDetail(id) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(new Category());
  const [originData, setOriginData] = useState(new Category());
  const [parentCategories, setParentCategories] = useState([]);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);

      const categoryData = await fetchCategoryById(id);
      if (categoryData == null) {
        enqueueSnackbar("Không tìm thấy danh mục", { variant: "error" });
        navigate("/admin/categories");
        return;
      }
      
      const allCategories = await fetchCategories();

      setFormData(new Category(categoryData));
      setOriginData(new Category(categoryData));
      setParentCategories(
        (Array.isArray(allCategories) ? allCategories : [allCategories])
          .filter(cat => cat.id !== Number(id)) // Prevent self-parenting
      );

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
    parentCategories,
    loadData,
  };
}
