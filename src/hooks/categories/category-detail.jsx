import {
  fetchCategories,
  fetchCategoryById,
} from "@/api/categories/category-lapi";
import { fetchAttributes } from "@/api/attributes/attribute-lapi";
import Category from "@/models/category";

import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCategoryDetail(id) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(new Category());
  const [originData, setOriginData] = useState(new Category());

  const [parentCategories, setParentCategories] = useState([]);
  const [allAttributes, setAllAttributes] = useState([]);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);

      const [categoryData, allCats, allAttrs] = await Promise.all([
        fetchCategoryById(id),
        fetchCategories(),
        fetchAttributes(),
      ]);

      if (categoryData == null) {
        enqueueSnackbar("Không tìm thấy danh mục", { variant: "error" });
        navigate("/admin/categories");
        return;
      }

      const category = new Category({
        ...categoryData,
        attribute_ids: categoryData.attributes?.map((attr) => attr.id) || [],
      });

      setFormData(category);
      setOriginData(category);


      setParentCategories(
        (Array.isArray(allCats) ? allCats : [allCats]).filter(
          (cat) => cat.id !== Number(id),
        ),
      );
      setAllAttributes(Array.isArray(allAttrs) ? allAttrs : []);
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
    allAttributes,
    loadData,
  };
}
