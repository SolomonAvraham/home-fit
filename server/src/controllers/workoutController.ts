import { Request, Response } from "express";
import WorkoutService from "../services/workoutService";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

class WorkoutController {
  public async createWorkout(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, date, duration, description, name, exercises } = req.body;
      console.log("Creating workout with data:", {
        userId,
        date,
        duration,
        description,
        name,
        exercises,
      });
      const workout = await WorkoutService.createWorkout({
        userId,
        date,
        duration,
        description,
        name,
        exercises,
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
      const workouts = await WorkoutService.getAllWorkouts();
      return res.status(200).json(workouts);
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
      const { date, duration, description, name, exercises } = req.body;
      const workout = await WorkoutService.updateWorkout(id, {
        date,
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
