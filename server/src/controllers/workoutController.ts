import { Request, Response } from "express";
import WorkoutService from "../services/workoutService";

export default class WorkoutController {
  static async createWorkout(req: Request, res: Response) {
    try {
      const workout = await WorkoutService.createWorkout(req.body);
      res.status(201).json(workout);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async getAllWorkouts(req: Request, res: Response) {
    try {
      const workouts = await WorkoutService.getAllWorkouts();
      res.status(200).json(workouts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async getWorkoutById(req: Request, res: Response) {
    try {
      const workout = await WorkoutService.getWorkoutById(req.params.id);
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.status(200).json(workout);
    } catch (error) {}
  }

  static async updateWorkout(req: Request, res: Response) {
    try {
      const workout = await WorkoutService.updateWorkout(
        req.params.id,
        req.body
      );
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.status(200).json(workout);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async deleteWorkout(req: Request, res: Response) {
    try {
      const deleted = await WorkoutService.deleteWorkout(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Workout not found" });
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


