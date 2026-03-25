import axios from "axios";
import { Product, ProductResponse } from "../../models/Product";
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
