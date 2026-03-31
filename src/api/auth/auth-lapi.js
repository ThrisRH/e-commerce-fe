import axios from "axios";

export const login = async (email, password, role = "user") => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      email,
      password,
      role,
    },
  );

  if (!response.data || !response.data.data) {
    throw new Error("Login failed");
  }

  return response.data;
};

export const logout = async () => {
    // Basic logout logic to clear tokens if needed
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
}
