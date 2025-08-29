import express from "express";
import cors from "cors";
import { AppDataSource } from "./db.js";
import workoutRoutes from "./routes/workouts.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(4000, () => console.log("Workout Service running on 4000"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
