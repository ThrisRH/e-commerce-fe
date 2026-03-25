import axios from "axios";
import Brand from "../../models/Brand";

export const fetchBrands = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/brands`,
  );
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch brands");
  }

  return Brand.fromJson(response.data.data.data || response.data.data);
};
