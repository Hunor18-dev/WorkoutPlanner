"use client";

import { useRouter } from "next/navigation";
import { useUser, useLogout } from "@/lib/hooks/useAuth";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const logout = useLogout();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [isLoading, user, router]);

  if (isLoading) return <p className="p-6">Loading user...</p>;
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-md p-4 text-center flex justify-between">
        <h1 className="text-2xl font-bold">Welcome, {user.userName}!</h1>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="text-red-500 font-medium"
        >
          Logout
        </button>
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
