import axiosClient from "@/config/axios-client";
import { API_VER } from "@/constants/env";

export const fetchShippingRates = async () => {
  try {
    const res = await axiosClient.get(`${API_VER}/shipping/rates`);
    if (!res.data || !res.data.data) {
      throw new Error("Failed to fetch shipping rates");
    }
    console.log(res.data.data);
    return res.data.data ?? [];
  } catch (err) {
    console.error("Failed to fetch shipping rates", err);
    return [];
  }
};

export const fetchShippingRateById = async (id) => {
  try {
    const res = await axiosClient.get(`${API_VER}/shipping/rates/${id}`);
    if (!res.data || !res.data.data) {
      throw new Error("Failed to fetch shipping rate");
    }
    return res.data.data ?? null;
  } catch (err) {
    console.error("Failed to fetch shipping rate", err);
    return null;
  }
};

export const createShippingRate = async (data) => {
  try {
    const res = await axiosClient.post(`${API_VER}/shipping/rates`, data);
    if (!res.data || !res.data.data) {
      throw new Error("Failed to create shipping rate");
    }
    return res.data.data ?? null;
  } catch (err) {
    console.error("Failed to create shipping rate", err);
    return null;
  }
};

export const updateShippingRate = async (id, data) => {
  try {
    const res = await axiosClient.patch(
      `${API_VER}/shipping/rates/${id}`,
      data,
    );
    if (!res.data || !res.data.data) {
      throw new Error("Failed to update shipping rate");
    }
    return res.data.data ?? null;
  } catch (err) {
    console.error("Failed to update shipping rate", err);
    return null;
  }
};

export const deleteShippingRate = async (id) => {
  try {
    await axiosClient.delete(`${API_VER}/shipping/rates/${id}`);
  } catch (err) {
    console.error("Failed to delete shipping rate", err);
  }
};

export const calculateShippingFee = async (data) => {
  try {
    const res = await axiosClient.post(
      `${API_VER}/shipping/calculate-fee`,
      data,
    );
    if (!res.data || !res.data.data) {
      throw new Error("Failed to calculate shipping fee");
    }
    return res.data.data ?? null;
  } catch (err) {
    console.error("Failed to calculate shipping fee", err);
    return null;
  }
};

export const identifyShippingRate = async (data) => {
  try {
    const res = await axiosClient.post(
      `${API_VER}/shipping/identify-rate`,
      data,
    );
    if (!res.data || !res.data.data) {
      throw new Error("Failed to identify shipping rate");
    }
    return res.data.data ?? null;
  } catch (err) {
    console.error("Failed to identify shipping rate", err);
    return null;
  }
};
