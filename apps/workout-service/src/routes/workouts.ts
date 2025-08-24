import { Router } from "express";

const router = Router();

// In real app, fetch from Postgres. Here is a stub.
let workouts = [
  { id: 1, name: "Push Up", difficulty: "Easy", media: "pushup.png" },
  { id: 2, name: "Squat", difficulty: "Medium", media: "squat.png" },
];

router.get("/", (req, res) => {
  res.json(workouts);
});

router.post("/", (req, res) => {
  const { name, difficulty, media } = req.body;
  const newWorkout = { id: workouts.length + 1, name, difficulty, media };
  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

export default router;
