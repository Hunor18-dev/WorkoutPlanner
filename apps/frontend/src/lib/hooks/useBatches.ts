"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBatches } from "../api/batchApi";

export function useBatches(userId: string) {
  return useQuery({
    queryKey: ["batches", userId],
    queryFn: () => fetchBatches(userId),
    enabled: !!userId, // don’t fetch until we know the user
  });
}
