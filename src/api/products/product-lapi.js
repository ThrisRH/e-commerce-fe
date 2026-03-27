import axios from "axios";
import { Product, ProductResponse } from "../../models/product";
import { env } from "@/constants/env";

export const fetchProducts = async (page = 1) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/products?page=${page}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch products");
  }

  return new ProductResponse(response.data);
};

export const fetchProductById = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch product");
  }

  return new Product(response.data.data);
};

export const updateProduct = async (id, data) => {
  console.log("data: ", data);
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update product");
  }

  return new Product(response.data.data);
};
export const createProduct = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/products`,
    data,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to create product");
  }

  return new Product(response.data.data);
};
export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`,
  );

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete product");
  }

  return response.data;
};
