"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useAuth";
import { useBatches } from "@/lib/hooks/useBatches";

export default function BatchesPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: batches, isLoading } = useBatches(user?.id);

  if (userLoading || isLoading) return <p className="p-6">Loading...</p>;
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Workout Batches</h1>
      <ul className="space-y-2">
        {batches?.map((b: any) => (
          <li key={b.id} className="p-3 bg-white shadow rounded">
            <span className="font-semibold">{b.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
