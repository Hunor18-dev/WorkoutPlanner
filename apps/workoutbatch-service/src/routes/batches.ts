import { Router } from "express";

const router = Router();

// Example user-specific data
let userBatches: Record<string, any[]> = {
  "user1": [
    { id: 1, name: "Full Body Workout", exercises: [ { workoutId: 1, reps: 10, name: "Push Up" } ] }
  ]
};

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  res.json(userBatches[userId] || []);
});

router.post("/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, exercises } = req.body;
  const newBatch = { id: Date.now(), name, exercises };
  if (!userBatches[userId]) userBatches[userId] = [];
  userBatches[userId].push(newBatch);
  res.status(201).json(newBatch);
});

export default router;
