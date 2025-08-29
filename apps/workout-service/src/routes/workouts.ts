import { Router } from "express";
import { AppDataSource } from "../db.js";
import { Workout } from "../entities/Workout.js";

const router = Router();

// GET all workouts
router.get("/", async (_req, res) => {
  const repo = AppDataSource.getRepository(Workout);
  const workouts = await repo.find();
  res.json(workouts);
});

// CREATE new workout
router.post("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Workout);
  const { name, description, difficulty, picture, durationMinutes, calories } = req.body;

  const newWorkout = repo.create({
    name,
    description,
    difficulty,
    picture,
    durationMinutes,
    calories,
  });

  await repo.save(newWorkout);
  res.status(201).json(newWorkout);
});

// UPDATE workout
router.put("/:id", async (req, res) => {
  const repo = AppDataSource.getRepository(Workout);
  const { id } = req.params;
  const { name, description, difficulty, media } = req.body;

  const workout = await repo.findOneBy({ id: parseInt(id) });
  if (!workout) return res.status(404).json({ message: "Workout not found" });

  repo.merge(workout, { name, description, difficulty });
  await repo.save(workout);
  res.json(workout);
});

router.delete("/:id", async (req, res) => {
  const repo = AppDataSource.getRepository(Workout);
  const { id } = req.params;

  const workout = await repo.findOneBy({ id: parseInt(id) });
  if (!workout) return res.status(404).json({ message: "Workout not found" });

  await repo.remove(workout);
  res.status(204).send();
});

export default router;
