import axios from "axios";
import Category from "../../models/category";
import { API_VER } from "@/constants/env";

export const fetchCategories = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/${API_VER}/categories`,
  );
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch categories");
  }

  return Category.fromJson(response.data.data.data || response.data.data);
};

export const fetchCategoryById = async (id, page = 1) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/${API_VER}/categories/${id}?page=${page}`,
  );
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch category");
  }

  return new Category(response.data.data.data || response.data.data);
};
export const createCategory = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/${API_VER}/categories`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to create category");
  }

  return new Category(response.data.data.data || response.data.data);
};

export const updateCategory = async (id, data) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/${API_VER}/categories/${id}`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update category");
  }

  return new Category(response.data.data.data || response.data.data);
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/${API_VER}/categories/${id}`,
  );

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete category");
  }

  return response.data;
};
