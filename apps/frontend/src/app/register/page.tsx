"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => registerUser(email, userName, password),
    onSuccess: () => {
      alert("User registered! Please login.");
      router.push("/login");
    },
    onError: (err: any) => {
      alert(err.response?.data || "Registration failed");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="bg-white shadow-xl rounded-2xl p-6 w-80"
      >
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
