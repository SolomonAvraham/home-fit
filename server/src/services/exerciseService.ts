import { validate as isValidUUID } from "uuid";
import { Exercise, Workout_exercises } from "../models/index";
import { ExerciseAttributes } from "../types/models";

class ExerciseService {
  static async createExercise(data: ExerciseAttributes) {
    try {
      const exercise = await Exercise.create(data);

      if (data.workoutId) {
        await Workout_exercises.create({
          workoutId: data.workoutId,
          exerciseId: exercise.id,
        });
      }

      return exercise;
    } catch (error) {
      console.error("Create Exercise Service Error:", error);
      throw new Error("Failed to create exercise");
    }
  }

  static async getAllExercises() {
    try {
      const exercises = await Exercise.findAll();
      return exercises;
    } catch (error) {
      console.error("Get All Exercises Service Error:", error);
      throw new Error("Failed to fetch exercises");
    }
  }

  static async getExerciseById(id: string) {
    try {
      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const exercise = await Exercise.findByPk(id);
      if (!exercise) {
        throw new Error("Exercise not found");
      }
      return exercise;
    } catch (error) {
      console.error("Get Exercise By ID Service Error:", error);
      throw new Error("Failed to fetch exercise");
    }
  }

  static async updateExercise(id: string, data: any) {
    try {
      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const exercise = await Exercise.findByPk(id);
      if (!exercise) {
        throw new Error("Exercise not found");
      }
      const updatedExercise = await exercise.update(data);
      return updatedExercise;
    } catch (error) {
      console.error("Update Exercise Service Error:", error);
      throw new Error("Failed to update exercise");
    }
  }

  static async deleteExercise(id: string) {
    try {
      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const exercise = await Exercise.findByPk(id);
      if (!exercise) {
        throw new Error("Exercise not found");
      }
      await exercise.destroy();
      return exercise;
    } catch (error) {
      console.error("Delete Exercise Service Error:", error);
      throw new Error("Failed to delete exercise");
    }
  }
}

export default ExerciseService;
