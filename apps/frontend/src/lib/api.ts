import axios from "axios";

const API_URL = "http://localhost:5000/api"; // your .NET backend

export async function registerUser(email: string, userName: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/register`, { email, userName, password });
  return res.data;
}

export async function loginUser(email: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data; // contains { token }
}
