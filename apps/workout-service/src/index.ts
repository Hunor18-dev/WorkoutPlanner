import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workouts.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Workout Service running on ${PORT}`));
