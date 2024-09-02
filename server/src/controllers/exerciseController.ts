import { Request, Response } from "express";
import ExerciseService from "../services/exerciseService";
import { validate as isValidUUID } from "uuid";

class ExerciseController {
  static async isExerciseExist(req: Request, res: Response): Promise<Response> {
    const { exerciseId, userId } = req.params;

    if (!isValidUUID(exerciseId) || !isValidUUID(userId)) {
      return res.status(400).json({ message: "Invalid exercise or user ID" });
    }

    try {
      const exerciseExists = await ExerciseService.isExerciseExist({
        exerciseId,
        userId,
      });

      return res.status(200).json(exerciseExists);
    } catch (error: any) {
      console.error("Error in addExerciseToWorkout:", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async isExerciseInWorkout(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { exerciseId, userId } = req.params;

    if (!isValidUUID(exerciseId) || !isValidUUID(userId)) {
      return res.status(400).json({ message: "Invalid exercise or user ID" });
    }

    try {
      const exerciseExists = await ExerciseService.isExerciseInWorkout({
        exerciseId,
        userId,
      });

      return res.status(200).json(exerciseExists);
    } catch (error: any) {
      console.error("Error in addExerciseToWorkout:", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async addExercise(req: Request, res: Response): Promise<Response> {
    const { exerciseId, userId } = req.params;

    if (!isValidUUID(exerciseId)) {
      return res.status(400).json({ message: "Invalid exercise ID" });
    }

    try {
      const updatedExercise = await ExerciseService.addExercise({
        exerciseId,
        userId,
      });

      return res.status(200).json(updatedExercise);
    } catch (error: any) {
      console.error("Error in addExerciseToWorkout:", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async addExerciseToWorkout(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { exerciseId, workoutId } = req.params;

    if (!isValidUUID(exerciseId) || !isValidUUID(workoutId)) {
      return res
        .status(400)
        .json({ message: "Invalid exercise or workout ID" });
    }

    try {
      const updatedExercise = await ExerciseService.addExerciseToWorkout({
        exerciseId,
        workoutId,
      });
      return res.status(200).json(updatedExercise);
    } catch (error: any) {
      console.error("Error in addExerciseToWorkout:", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async createExercise(req: Request, res: Response) {
    try {
      const exercise = await ExerciseService.createExercise(req.body);
      return res.status(201).json(exercise);
    } catch (error: any) {
      console.error("Error in createExercise:", error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  static async getAllExercises(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    try {
      const result = await ExerciseService.getAllExercises(page, limit);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error in getAllExercises:", error.message);
      return res.status(500).json({ message: error.message, error });
    }
  }

  static async getExercisesByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { userId } = req.params;

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    try {
      const result = await ExerciseService.getExercisesByUserId(
        userId,
        page,
        limit
      );

      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error in getExercisesByUserId:", error.message);

      return res.status(500).json({ message: error.message });
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
      return res.status(400).json({ message: error.message, error });
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
      return res.status(400).json({ message: error.message, error });
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
      return res.status(400).json({ message: error.message, error });
    }
  }
}

export default ExerciseController;
