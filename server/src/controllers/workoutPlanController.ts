import { Request, Response } from "express";
import { WorkoutPlan } from "../models";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

class WorkoutPlanController {
  public async createWorkoutPlan(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { userId, name, description, duration } = req.body;
      const workoutPlan = await WorkoutPlan.create({
        id: uuidv4(),
        userId,
        name,
        description,
        duration,
      });
      return res.status(201).json(workoutPlan);
    } catch (error: any) {
      return res
        .status(400)
        .json({
          message: "Failed to create workout plan",
          error: error.message,
        });
    }
  }

  public async getWorkoutPlanById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }
      const workoutPlan = await WorkoutPlan.findByPk(id);
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(workoutPlan);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Failed to get workout plan", error: error.message });
    }
  }

  public async getAllWorkoutPlans(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const workoutPlans = await WorkoutPlan.findAll();
      return res.status(200).json(workoutPlans);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Failed to get workout plans", error: error.message });
    }
  }

  public async updateWorkoutPlan(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }
      const { name, description, duration } = req.body;
      const [updated] = await WorkoutPlan.update(
        { name, description, duration },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      const updatedWorkoutPlan = await WorkoutPlan.findByPk(id);
      return res.status(200).json(updatedWorkoutPlan);
    } catch (error: any) {
      return res
        .status(400)
        .json({
          message: "Failed to update workout plan",
          error: error.message,
        });
    }
  }

  public async deleteWorkoutPlan(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }
      const deleted = await WorkoutPlan.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(204).send();
    } catch (error: any) {
      return res
        .status(400)
        .json({
          message: "Failed to delete workout plan",
          error: error.message,
        });
    }
  }
}

export default new WorkoutPlanController();
