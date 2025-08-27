"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useAuth";
import { useWorkouts } from "@/lib/hooks/useWorkouts";

export default function WorkoutsPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: workouts, isLoading } = useWorkouts();

  if (userLoading || isLoading) return <p className="p-6">Loading...</p>;
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Workout List</h1>
      <ul className="space-y-2">
        {workouts?.map((w: any) => (
          <li key={w.id} className="p-3 bg-white shadow rounded">
            <span className="font-semibold">{w.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
