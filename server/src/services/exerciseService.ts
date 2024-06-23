import { validate as isValidUUID } from "uuid";
import Exercise from "../models/Exercise";

export default class ExerciseService {
  static async createExercise(data: any) {
    return Exercise.create(data);
  }

  static async getAllExercises() {
    return Exercise.findAll();
  }

  static async getExerciseById(id: string) {
    if (!isValidUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    return Exercise.findByPk(id);
  }

  static async updateExercise(id: string, data: any) {
    if (!isValidUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return null;
    }
    return exercise.update(data);
  }

  static async deleteExercise(id: string) {
    if (!isValidUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return null;
    }
    await exercise.destroy();
    return exercise;
  }
}
