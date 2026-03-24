import axios from "axios";
import { ProductResponse } from "../../models/Product";

export const fetchProducts = async (page = 1) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/products?page=${page}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch products");
  }

  return new ProductResponse(response.data);
};
