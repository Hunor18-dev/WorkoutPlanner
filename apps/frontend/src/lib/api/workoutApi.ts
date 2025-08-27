import axios from "axios";

const WORKOUTS_URL = "http://localhost:4000/api";

export const workoutApi = axios.create({
  baseURL: WORKOUTS_URL,
});

workoutApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints
export async function fetchWorkouts() {
  const res = await workoutApi.get("/workouts");
  return res.data;
}
