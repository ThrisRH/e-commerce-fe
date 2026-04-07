import axios from "axios";
import { Product, ProductResponse } from "../../models/product";
import { API_VER, env } from "@/constants/env";
import axiosClient from "@/config/axios-client";

export const fetchProducts = async ({ page = 1, limit = 10 } = {}) => {
  const response = await axios.get(
    `/api/${API_VER}/products?page=${page}&limit=${limit}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch products");
  }

  return new ProductResponse(response.data);
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`/api/${API_VER}/products/${id}`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch product");
  }

  return new Product(response.data.data);
};

export const updateProduct = async (id, data) => {
  console.log("data: ", data);
  const response = await axiosClient.patch(`/${API_VER}/products/${id}`, data);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update product");
  }

  return new Product(response.data.data);
};
export const createProduct = async (data) => {
  const response = await axiosClient.post(`/${API_VER}/products`, data);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to create product");
  }

  return new Product(response.data.data);
};
export const deleteProduct = async (id) => {
  const response = await axiosClient.delete(`/${API_VER}/products/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete product");
  }

  return response.data;
};

export const fetchProductsByCategory = async (cate_id) => {
  const response = await axios.get(`/api/v1/categories/${cate_id}/products`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch products");
  }

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};
export const searchProducts = async (keyword, page = 1, limit = 10) => {
  const response = await axios.get(
    `/api/${API_VER}/products/search?keyword=${keyword}&page=${page}&limit=${limit}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to search products");
  }

  return new ProductResponse(response.data);
};
