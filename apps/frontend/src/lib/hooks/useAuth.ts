"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "../api/authApi";
import { fetchCurrentUser } from "../api/usersApi";

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
      login(data.email, data.password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: { email: string; userName: string; password: string }) =>
      register(data.email, data.userName, data.password),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    // update this part so it triggers the backend to remove the refresh token
    localStorage.removeItem("token");
    queryClient.clear(); // wipe cache
  };
}
