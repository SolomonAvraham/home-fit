import { Request, Response } from "express";
import ExerciseService from "../services/exerciseService";
import { validate as isValidUUID } from "uuid";

class ExerciseController {
  static async createExercise(req: Request, res: Response) {
    try {
      const exercise = await ExerciseService.createExercise(req.body);
      return res.status(201).json(exercise);
    } catch (error: any) {
      console.error("Error in createExercise:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to create exercise", error: error.message });
    }
  }

  static async getAllExercises(req: Request, res: Response) {
    try {
      const exercises = await ExerciseService.getAllExercises();
      return res.status(200).json(exercises);
    } catch (error: any) {
      console.error("Error in getAllExercises:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to get exercises", error: error.message });
    }
  }

  static async getExerciseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isValidUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const exercise = await ExerciseService.getExerciseById(id);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      return res.status(200).json(exercise);
    } catch (error: any) {
      console.error("Error in getExerciseById:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to get exercise", error: error.message });
    }
  }

  static async updateExercise(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isValidUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const exercise = await ExerciseService.updateExercise(id, req.body);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      return res.status(200).json(exercise);
    } catch (error: any) {
      console.error("Error in updateExercise:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to update exercise", error: error.message });
    }
  }

  static async deleteExercise(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isValidUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const deleted = await ExerciseService.deleteExercise(id);
      if (!deleted) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      return res.status(204).send();
    } catch (error: any) {
      console.error("Error in deleteExercise:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to delete exercise", error: error.message });
    }
  }
}

export default ExerciseController;
