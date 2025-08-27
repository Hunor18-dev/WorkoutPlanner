"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWorkouts } from "../api/workoutApi";

export function useWorkouts() {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts,
  });
}
