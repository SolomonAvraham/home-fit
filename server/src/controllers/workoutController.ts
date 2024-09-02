import { Request, Response } from "express";
import WorkoutService from "../services/workoutService";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

class WorkoutController {
  public async isWorkoutExist(req: Request, res: Response): Promise<Response> {
    const { workoutId, userId } = req.query;

    try {
      const exists = await WorkoutService.isWorkoutExist(
        workoutId as string,
        userId as string
      );

      return res.json(exists);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to check workout existence" });
    }
  }
  public async addWorkout(req: Request, res: Response): Promise<Response> {
    try {
      const { id, userId } = req.params;

      if (!uuidValidate(id) || !uuidValidate(userId)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const workout = await WorkoutService.addWorkout(id, userId);

      return res.status(200).json(workout);
    } catch (error: any) {
      console.error("Error in addWorkout:", error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  public async getWorkoutsByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id: userId } = req.params;

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    if (!uuidValidate(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID", error: "Invalid user ID" });
    }

    try {
      const result = await WorkoutService.getWorkoutsByUserId(
        userId,
        page,
        limit
      );
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error in getWorkoutsByUserId:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to get workouts", error: error.message });
    }
  }

  public async createWorkout(req: Request, res: Response): Promise<Response> {
    try {
      const {
        userId,
        id = uuidv4(),
        duration,
        description,
        name,
        createdBy,
      } = req.body;

      const workout = await WorkoutService.createWorkout({
        userId,
        id,
        duration,
        description,
        name,
        createdBy,
      });

      return res.status(201).json(workout);
    } catch (error: any) {
      console.error("Error in createWorkout:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to create workout", error: error.message });
    }
  }

  public async getWorkoutById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }
      const workout = await WorkoutService.getWorkoutById(id);
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      return res.status(200).json(workout);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Failed to get workout", error: error.message });
    }
  }

  public async getAllWorkouts(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const result = await WorkoutService.getAllWorkouts(page, limit);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error in getAllWorkouts:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to get workouts", error: error.message });
    }
  }

  public async updateWorkout(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!uuidValidate(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const { duration, description, name, exercises } = req.body;

      const workout = await WorkoutService.updateWorkout(id, {
        duration,
        description,
        name,
        exercises,
      });
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      return res.status(200).json(workout);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Failed to update workout", error: error.message });
    }
  }

  public async deleteWorkout(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }
      const result = await WorkoutService.deleteWorkout(id);
      if (result === 0) {
        return res.status(404).json({ message: "Workout not found" });
      }
      return res.status(204).send();
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Failed to delete workout", error: error.message });
    }
  }
}

export default new WorkoutController();
