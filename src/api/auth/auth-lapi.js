import { env, API_VER } from "@/constants/env";
import { User } from "@/models/user";
import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post(
    `${env.VITE_API_URL}/api/${API_VER}/auth/login`,
    {
      email,
      password,
    },
  );

  if (!response.data || !response.data.data) {
    throw new Error("Login failed");
  }

  return response.data;
};

export const register = async (payload) => {
  const response = await axios.post(
    `${env.VITE_API_URL}/api/${API_VER}/auth/register`,
    {
      name: `${payload.fname} ${payload.lname}`,
      email: payload.email,
      phone_number: payload.phone,
      password: payload.password,
    },
  );

  if (!response.data || !response.data.data) {
    throw new Error("Register failed");
  }

  return response.data;
};

export const fetchMe = async (token) => {
  const response = await axios.get(
    `${env.VITE_API_URL}/api/${API_VER}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.data || !response.data.data) {
    throw new Error("Fetch me failed");
  }

  console.log("response.data: ", response.data);
  return new User(response.data.data);
};

export const logout = async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
};
