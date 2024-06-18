import { Request, Response } from "express";
import ExerciseService from "../services/exerciseService";

export class ExerciseController {
  static async createExercise(req: Request, res: Response) {
    try {
      const exercise = await ExerciseService.createExercise(req.body);
      res.status(201).json(exercise);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async getAllExercises(req: Request, res: Response) {
    try {
      const exercises = await ExerciseService.getAllExercises();
      res.status(200).json(exercises);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async getExerciseById(req: Request, res: Response) {
    try {
      const exercise = await ExerciseService.getExerciseById(req.params.id);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.status(200).json(exercise);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async updateExercise(req: Request, res: Response) {
    try {
      const exercise = await ExerciseService.updateExercise(
        req.params.id,
        req.body
      );
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.status(200).json(exercise);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async deleteExercise(req: Request, res: Response) {
    try {
      const deleted = await ExerciseService.deleteExercise(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.status(204).json();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }
}
