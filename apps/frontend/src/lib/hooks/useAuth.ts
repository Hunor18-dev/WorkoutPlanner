"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUser, loginUser, registerUser } from "../api/authApi";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    retry: false, // don’t spam if token is invalid
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginUser(data.email, data.password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: { email: string; userName: string; password: string }) =>
      registerUser(data.email, data.userName, data.password),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    queryClient.clear(); // wipe cache
  };
}
