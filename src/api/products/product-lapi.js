import axios from "axios";
import { Product, ProductResponse } from "../../models/product";
import { API_VER, env } from "@/constants/env";

export const fetchProducts = async (page = 1) => {
  const response = await axios.get(
    `${env.VITE_API_URL}/api/${API_VER}/products?page=${page}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch products");
  }

  return new ProductResponse(response.data);
};

export const fetchProductById = async (id) => {
  const response = await axios.get(
    `${env.VITE_API_URL}/api/${API_VER}/products/${id}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch product");
  }

  return new Product(response.data.data);
};

export const updateProduct = async (id, data) => {
  console.log("data: ", data);
  const response = await axios.patch(
    `${env.VITE_API_URL}/api/${API_VER}/products/${id}`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update product");
  }

  return new Product(response.data.data);
};
export const createProduct = async (data) => {
  const response = await axios.post(
    `${env.VITE_API_URL}/api/${API_VER}/products`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to create product");
  }

  return new Product(response.data.data);
};
export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${env.VITE_API_URL}/api/${API_VER}/products/${id}`,
  );

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete product");
  }

  return response.data;
};
