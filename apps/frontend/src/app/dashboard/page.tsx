"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; userName: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/");
      });
  }, [router]);

  if (!user) return <p className="p-6">Loading user...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-md p-4 text-center">
        <h1 className="text-2xl font-bold">Welcome, {user.userName}!</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-3/4 max-w-4xl">
        <div
          onClick={() => router.push("/workouts")}
          className="cursor-pointer bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">Workout List</h2>
          <p className="text-gray-500">View all exercises (admin can edit)</p>
        </div>

        <div
          onClick={() => router.push("/batches")}
          className="cursor-pointer bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">Workout Batches</h2>
          <p className="text-gray-500">Create and manage your workout plans</p>
        </div>
      </div>
    </div>
  );
}
