import axiosClient from "@/config/axios-client";
import { API_VER } from "@/constants/env";
import Attribute from "../../models/attribute";

export const fetchAttributes = async () => {
  const response = await axiosClient.get(`/${API_VER}/attributes`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch attributes");
  }

  // Handle both array and paginated response
  const data = response.data.data.data || response.data.data;
  return Attribute.fromJson(data);
};

export const createAttribute = async (data) => {
  const response = await axiosClient.post(`/${API_VER}/attributes`, data);
  return response.data;
};

export const updateAttribute = async (id, data) => {
  const response = await axiosClient.patch(`/${API_VER}/attributes/${id}`, data);
  return response.data;
};

export const deleteAttribute = async (id) => {
  const response = await axiosClient.delete(`/${API_VER}/attributes/${id}`);
  return response.data;
};

// Attribute Values API
export const fetchAttributeValues = async (attributeId = null) => {
  const url = attributeId 
    ? `/${API_VER}/attribute-values?attribute_id=${attributeId}`
    : `/${API_VER}/attribute-values`;
  const response = await axiosClient.get(url);
  return response.data.data;
};

export const createAttributeValue = async (data) => {
  const response = await axiosClient.post(`/${API_VER}/attribute-values`, data);
  return response.data;
};

export const updateAttributeValue = async (id, data) => {
  const response = await axiosClient.patch(`/${API_VER}/attribute-values/${id}`, data);
  return response.data;
};

export const deleteAttributeValue = async (id) => {
  const response = await axiosClient.delete(`/${API_VER}/attribute-values/${id}`);
  return response.data;
};
