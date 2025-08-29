import "reflect-metadata";
import { DataSource } from "typeorm";
import { Workout } from "./entities/Workout.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",   // change to your user
  password: "admin", // change to your password
  database: "workoutdb",
  synchronize: false, // we’ll use migrations
  logging: true,
  entities: [Workout],
  migrations: ["src/migrations/*.ts"],
});
