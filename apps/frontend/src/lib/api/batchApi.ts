import axios from "axios";

const BATCHES_URL = "http://localhost:5001/api";

export const batchApi = axios.create({
  baseURL: BATCHES_URL,
});

batchApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints
export async function fetchBatches(userId: string) {
  const res = await batchApi.get(`/batches/${userId}`);
  return res.data;
}
