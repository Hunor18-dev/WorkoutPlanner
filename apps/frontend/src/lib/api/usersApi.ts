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
export async function fetchCurrentUser() {
  const res = await authApi.get("/users/me");
  return res.data;
}
