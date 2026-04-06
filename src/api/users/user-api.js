import { API_VER } from "@/constants/env";
import { User } from "@/models/user";
import { Meta } from "@/models/MetaData/meta";
import axiosClient from "@/config/axios-client";

export const fetchCustomers = async (page = 1, limit = 10) => {
  const response = await axiosClient.get(
    `/${API_VER}/users/customers?page=${page}&limit=${limit}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch customers");
  }

  return {
    data: User.fromJson(response.data.data),
    meta: new Meta(response.data.meta),
  };
};

export const fetchEmployees = async (page = 1, limit = 10) => {
  const response = await axiosClient.get(
    `/${API_VER}/users/staffs?page=${page}&limit=${limit}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch employees");
  }

  return {
    data: User.fromJson(response.data.data),
    meta: new Meta(response.data.meta),
  };
};

export const fetchRoles = async (page = 1, limit = 10) => {
  const response = await axiosClient.get(
    `/${API_VER}/roles?page=${page}&limit=${limit}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch roles");
  }

  return {
    data: response.data.data,
    meta: new Meta(response.data.meta),
  };
};

export const deleteUser = async (id) => {
  const response = await axiosClient.delete(`/${API_VER}/users/${id}`);

  if (!response.data) {
    throw new Error("Failed to delete user");
  }

  return response.data;
};

export const createUser = async (data) => {
  const response = await axiosClient.post(`/${API_VER}/users`, data);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to create user");
  }

  return new User(response.data.data);
};

export const createRole = async (data) => {
  const response = await axiosClient.post(`/${API_VER}/roles`, data);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to create role");
  }

  return response.data.data;
};

export const fetchUserById = async (id) => {
  const response = await axiosClient.get(`/${API_VER}/users/${id}`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch user");
  }

  return new User(response.data.data);
};

export const fetchRoleById = async (id) => {
  const response = await axiosClient.get(`/${API_VER}/roles/${id}`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch role");
  }

  return response.data.data;
};

export const updateUser = async (id, data) => {
  const response = await axiosClient.patch(`/${API_VER}/users/${id}`, data);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update user");
  }

  return new User(response.data.data);
};

export const updateRole = async (id, data) => {
  const response = await axiosClient.patch(`/${API_VER}/roles/${id}`, data);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to update role");
  }

  return response.data.data;
};

export const deleteRole = async (id) => {
  const response = await axiosClient.delete(`/${API_VER}/roles/${id}`);

  if (!response.data) {
    throw new Error("Failed to delete role");
  }

  return response.data;
};
