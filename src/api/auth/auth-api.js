import { env, API_VER } from "@/constants/env";
import { User } from "@/models/user";
import axios from "axios";

export const login = async (email, password, role) => {
  const response = await axios.post(`/api/${API_VER}/auth/login`, {
    email,
    password,
    role,
  });

  if (!response.data || !response.data.data) {
    throw new Error("Đăng nhập thất bại");
  }

  return response.data;
};

export const register = async (payload) => {
  const response = await axios.post(`/api/${API_VER}/auth/register`, {
    name: `${payload.fname} ${payload.lname}`,
    email: payload.email,
    phone_number: payload.phone,
    password: payload.password,
  });

  if (!response.data || !response.data.data) {
    throw new Error("Đăng ký thất bại");
  }

  return response.data;
};

export const fetchMe = async (token) => {
  const response = await axios.get(`/api/${API_VER}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data || !response.data.data) {
    throw new Error("Tải thông tin cá nhân thất bại");
  }

  return new User(response.data.data);
};

export const logout = async (token) => {
  const response = await axios.post(
    `/api/${API_VER}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.data || !response.data.data) {
    throw new Error("Đăng xuất thất bại");
  }

  return response.data;
};
