import axios from "axios";
import Category from "../../models/Category";

export const fetchCategories = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/categories`,
  );
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch categories");
  }

  return Category.fromJson(response.data.data.data || response.data.data);
};

export const fetchCategoryById = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
  );
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch category");
  }

  return new Category(response.data.data.data || response.data.data);
};
