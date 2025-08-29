"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "@/lib/api/workoutApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, [router]);

  // Queries
  const { data: workouts, isLoading, isError } = useQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setForm({ name: "", description: "", difficulty: "Easy" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateWorkout(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });

  // Form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    difficulty: "Easy",
  });

  // Track editing
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (w: any) => {
    setEditingId(w.id);
    setForm({
      name: w.name,
      description: w.description,
      difficulty: w.difficulty,
    });
  };

  if (isLoading) return <p className="p-6">Loading workouts...</p>;
  if (isError) return <p className="p-6 text-red-500">Error loading workouts</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Workouts</h1>

      {/* Add/Edit Workout Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow-md mb-8"
      >
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Workout" : "Add New Workout"}
        </h2>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Workout Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={form.difficulty}
            onChange={(e) =>
              setForm({ ...form, difficulty: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingId
                ? updateMutation.isPending
                  ? "Updating..."
                  : "Update Workout"
                : createMutation.isPending
                ? "Adding..."
                : "Add Workout"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", description: "", difficulty: "Easy" });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Workout List */}
      <div className="grid gap-4">
        {workouts?.map((w: any) => (
          <div
            key={w.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{w.name}</h3>
              <p className="text-gray-500">{w.description}</p>
              <span className="text-sm text-blue-600">{w.difficulty}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(w)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(w.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
