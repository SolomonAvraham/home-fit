import   Exercise  from "../models/Exercise";

export default class ExerciseService {
  static async createExercise(data: any) {
    return Exercise.create(data);
  }

  static async getAllExercises() {
    return Exercise.findAll();
  }

  static async getExerciseById(id: string) {
    return Exercise.findByPk( id);
  }

  static async updateExercise(id: string, data: any) {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return null;
    }
    return exercise.update(data);
  }

  static async deleteExercise(id: string) {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return null;
    }
    await exercise.destroy();
    return exercise;
  }
}
