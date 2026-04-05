import axios from "axios";
import { API_VER, env } from "@/constants/env";
import Attribute from "../../models/attribute";

export const fetchAttributes = async () => {
  const response = await axios.get(`/api/attributes`);

  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch attributes");
  }

  return Attribute.fromJson(response.data.data.data || response.data.data);
};
