import { API_VER, env } from "@/constants/env";
import { Meta } from "@/models/MetaData/meta";
import Order from "@/models/order";
import { Product } from "@/models/product";
import axios from "axios";

export const createOrder = async (data) => {
  const result = await axios.post(
    `${env.VITE_API_URL}/api/${API_VER}/orders`,
    data,
  );

  if (!result.data) {
    throw new Error("Failed to create order");
  }

  return result.data;
};

export const fetchOrders = async (page = 1, limit = 10) => {
  const result = await axios.get(
    `${env.VITE_API_URL}/api/${API_VER}/orders?page=${page}&limit=${limit}`,
  );

  if (!result.data) {
    throw new Error("Failed to fetch orders");
  }

  console.log(result.data.data);

  return {
    data: Order.fromJson(result.data.data),
    meta: new Meta(result.data.meta),
  };
};
