import axiosClient from "@/config/axios-client";
import { API_VER, env } from "@/constants/env";
import { Meta } from "@/models/meta";
import Order from "@/models/order";
import axios from "axios";

export const createOrder = async (data) => {
  const result = await axios.post(`/api/${API_VER}/orders`, data);

  if (!result.data) {
    throw new Error("Failed to create order");
  }

  return result.data;
};

export const fetchOrders = async (page = 1, limit = 10) => {
  const result = await axiosClient.get(
    `/${API_VER}/orders?page=${page}&limit=${limit}`,
  );

  if (!result.data) {
    throw new Error("Failed to fetch orders");
  }

  return {
    data: Order.fromJson(result.data.data),
    meta: new Meta(result.data.meta),
  };
};

export const fetchOrderById = async (id) => {
  const result = await axiosClient.get(`/${API_VER}/orders/${id}`);

  if (!result.data) {
    throw new Error("Failed to fetch order");
  }

  return Order.fromJson(result.data.data);
};

export const updateOrder = async (id, data) => {
  const result = await axiosClient.patch(`/${API_VER}/orders/${id}`, data);

  if (!result.data) {
    throw new Error("Failed to update order");
  }

  return result.data;
};

export const fetchOrderItems = async () => {
  const result = await axiosClient.get(`/${API_VER}/order-items`);

  if (!result.data) {
    throw new Error("Failed to fecth order items");
  }

  return result.data;
};

export const fetchWeeklyRevenue = async () => {
  const response = await axiosClient.get(
    `/${API_VER}/orders/stats/revenue/weekly`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch weekly revenue");
  }

  return response.data.data;
};
export const trackOrder = async (search) => {
  const result = await axios.get(
    `/api/${API_VER}/orders/search?shipping_phone=${search}`,
  );
  if (!result.data || !result.data.data) {
    throw new Error("Không tìm thấy đơn hàng");
  }
  return Order.fromJson(result.data.data);
};
