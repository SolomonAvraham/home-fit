import { Request, Response } from "express";
import WorkoutPlanService from "../services/workoutPlanService";

export default class WorkoutPlanController {
  static async createWorkoutPlan(req: Request, res: Response) {
    try {
      const workoutPlan = await WorkoutPlanService.createWorkoutPlan(req.body);
      res.status(201).json(workoutPlan);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async getAllWorkoutPlans(req: Request, res: Response) {
    try {
      const workoutPlans = await WorkoutPlanService.getAllWorkoutPlans();
      res.status(200).json(workoutPlans);
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getWorkoutPlanById(req: Request, res: Response) {
    try {
      const workoutPlan = await WorkoutPlanService.getWorkoutPlanById(
        req.params.id
      );
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      res.status(200).json(workoutPlan);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async updateWorkoutPlan(req: Request, res: Response) {
    try {
      const workoutPlan = await WorkoutPlanService.updateWorkoutPlan(
        req.params.id,
        req.body
      );
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      res.status(200).json(workoutPlan);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async deleteWorkoutPlan(req: Request, res: Response) {
    try {
      const deleted = await WorkoutPlanService.deleteWorkoutPlan(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Workout plan not found" });
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
