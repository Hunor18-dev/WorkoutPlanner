import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: Difficulty,
    default: Difficulty.MEDIUM,
  })
  difficulty!: Difficulty;

  @Column({ nullable: true })
  picture?: string; // later we can store file URL/path

  @Column({ type: "int", default: 0 })
  durationMinutes!: number;

  @Column({ type: "int", default: 0 })
  calories!: number;
}
