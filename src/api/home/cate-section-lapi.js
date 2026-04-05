import axios from "axios";

export const fetchCateSection = async () => {
  const response = await axios.get(`/api/v1/home-getting`);

  if (!response.data || !response.data.data) {
    throw new Error("Fetch cate latest product failed");
  }

  return response.data;
};
