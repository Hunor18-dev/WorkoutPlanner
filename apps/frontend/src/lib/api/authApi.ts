import axios from "axios";

const AUTH_URL = "http://localhost:5000/api";

export const authApi = axios.create({
  baseURL: AUTH_URL,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints
export async function register(email: string, userName: string, password: string) {
  try {
    const res = await authApi.post("/auth/register", { email, userName, password });
    return res.data;
  } catch (err: any) {
    // Extract server error message if available
    const message = err.response?.data || "Registration failed.";
    throw new Error(message);
  }
}

export async function login(email: string, password: string) {
  try {
    const res = await authApi.post("/auth/login", { email, password });
    return res.data; // { token }
  } catch (err: any) {
    const message = err.response?.data || "Login failed.";
    throw new Error(message);
  }
}
