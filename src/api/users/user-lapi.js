import axios from "axios";
import { API_VER, env } from "@/constants/env";
import { User } from "@/models/user";
import { Meta } from "@/models/MetaData/meta";

export const fetchUsers = async (page = 1, limit = 10, role = "") => {
  const response = await axios.get(
    `${env.VITE_API_URL}/api/${API_VER}/users?page=${page}&limit=${limit}${role ? `&role=${role}` : ""}`,
  );

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch users");
  }

  console.log(response.data.data);

  return {
    data: User.fromJson(response.data.data),
    meta: new Meta(response.data.meta),
  };
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${env.VITE_API_URL}/api/${API_VER}/users/${id}`,
  );

  if (!response.data) {
    throw new Error("Failed to delete user");
  }

  return response.data;
};
