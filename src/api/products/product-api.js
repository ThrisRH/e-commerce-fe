import axios from "axios";
import { Product, ProductResponse, ProductDetail } from "../../models/product";
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

export const fetchProductBySlug = async (slug, sku) => {
  const response = await axios.get(
    `/api/${API_VER}/products/${slug}?sku=${sku}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch product");
  }

  return response.data.data;
};

export const fetchProductByCateId = async (id) => {
  const response = await axios.get(`/api/${API_VER}/categories/${id}/products`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch product");
  }

  return response.data.data;
};

export const fetchAdminProductDetail = async (slug) => {
  const response = await axiosClient.get(`/${API_VER}/products/admin/${slug}`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch product detail");
  }

  return ProductDetail.fromJson(response.data.data);
};

export const updateProduct = async (id, data) => {
  const response = await axiosClient.patch(`/${API_VER}/products/${id}`, data);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update product");
  }

  return new Product(response.data.data);
};

export const updateProductItem = async (itemId, data) => {
  const response = await axiosClient.patch(
    `/${API_VER}/products/items/${itemId}`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update product item");
  }

  return response.data;
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

export const updateVariant = async (variantId, data) => {
  const response = await axiosClient.patch(
    `/${API_VER}/products/variants/${variantId}`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update variant");
  }

  return response.data;
};

export const createVariant = async (data) => {
  const response = await axiosClient.post(
    `/${API_VER}/products/variants`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to create variant");
  }

  return response.data;
};

export const deleteVariant = async (variantId) => {
  const response = await axiosClient.delete(
    `/${API_VER}/products/variants/${variantId}`,
  );

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete variant");
  }

  return response.data;
};

export const fetchVariantById = async (id) => {
  const response = await axiosClient.get(`/${API_VER}/products/variants/${id}`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch variant");
  }

  return response.data.data;
};
