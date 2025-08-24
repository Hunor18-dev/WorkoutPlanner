import express from "express";
import cors from "cors";
import batchRoutes from "./routes/batches.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/batches", batchRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`WorkoutBatch Service running on ${PORT}`));
