import axiosClient from "@/config/axios-client";
import { API_VER } from "@/constants/env";

export const fetchShippingRates = async () => {
  const res = await axiosClient.get(`${API_VER}/shipping/rates`);
  return res.data?.data ?? [];
};

export const fetchShippingRate = async (id) => {
  const res = await axiosClient.get(`${API_VER}/shipping/rates/${id}`);
  return res.data?.data ?? null;
};

export const createShippingRate = async (data) => {
  const res = await axiosClient.post(`${API_VER}/shipping/rates`, data);
  return res.data?.data;
};

export const updateShippingRate = async (id, data) => {
  const res = await axiosClient.patch(`${API_VER}/shipping/rates/${id}`, data);
  return res.data?.data;
};

export const deleteShippingRate = async (id) => {
  await axiosClient.delete(`${API_VER}/shipping/rates/${id}`);
};

export const calculateShippingFee = async (data) => {
  const res = await axiosClient.post(`${API_VER}/shipping/calculate-fee`, data);
  return res.data?.data;
};

export const identifyShippingRate = async (data) => {
  const res = await axiosClient.post(`${API_VER}/shipping/identify-rate`, data);
  return res.data?.data;
};
