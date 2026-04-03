import { API_VER, env } from "@/constants/env";
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
