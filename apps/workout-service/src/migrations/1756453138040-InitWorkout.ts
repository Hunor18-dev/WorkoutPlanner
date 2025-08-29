import { MigrationInterface, QueryRunner } from "typeorm";

export class InitWorkout1756453138040 implements MigrationInterface {
    name = 'InitWorkout1756453138040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."workout_difficulty_enum" AS ENUM('Easy', 'Medium', 'Hard')`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "difficulty" "public"."workout_difficulty_enum" NOT NULL DEFAULT 'Medium', "picture" character varying, "durationMinutes" integer NOT NULL DEFAULT '0', "calories" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TYPE "public"."workout_difficulty_enum"`);
    }

}
