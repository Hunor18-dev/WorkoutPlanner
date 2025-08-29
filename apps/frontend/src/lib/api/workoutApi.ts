import axios from "axios";

const WORKOUTS_URL = "http://localhost:4000/api/workouts";

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
  const res = await axios.get(WORKOUTS_URL);
  return res.data;
}

export async function createWorkout(data: {
  name: string;
  description: string;
  difficulty: string;
}) {
  const res = await axios.post(WORKOUTS_URL, data);
  return res.data;
}

export async function updateWorkout(id: number, data: {
  name: string;
  description: string;
  difficulty: string;
}) {
  const res = await axios.put(`${WORKOUTS_URL}/${id}`, data);
  return res.data;
}

export async function deleteWorkout(id: number) {
  const res = await axios.delete(`${WORKOUTS_URL}/${id}`);
  return res.data;
}