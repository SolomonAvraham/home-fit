import { Request, Response } from "express";
import ProgressService from "../services/progressService";
import { validate as validateUUID } from "uuid";

class ProgressController {
  static async createProgress(req: Request, res: Response): Promise<Response> {
    try {
      const progress = await ProgressService.createProgress(req.body);
      return res.status(201).json(progress);
    } catch (error: any) {
      console.error("Error in createProgress:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to create progress", error: error.message });
    }
  }

  static async getAllProgress(req: Request, res: Response): Promise<Response> {
    try {
      const progress = await ProgressService.getAllProgress();
      return res.status(200).json(progress);
    } catch (error: any) {
      console.error("Error in getAllProgress:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to get progress", error: error.message });
    }
  }

  static async getProgressById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!validateUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const progress = await ProgressService.getProgressById(id);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      return res.status(200).json(progress);
    } catch (error: any) {
      console.error("Error in getProgressById:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to get progress", error: error.message });
    }
  }

  static async updateProgress(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!validateUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const progress = await ProgressService.updateProgress(id, req.body);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      return res.status(200).json(progress);
    } catch (error: any) {
      console.error("Error in updateProgress:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to update progress", error: error.message });
    }
  }

  static async deleteProgress(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!validateUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const deleted = await ProgressService.deleteProgress(id);
      if (!deleted) {
        return res.status(404).json({ message: "Progress not found" });
      }

      return res.status(204).send();
    } catch (error: any) {
      console.error("Error in deleteProgress:", error.message);
      return res
        .status(400)
        .json({ message: "Failed to delete progress", error: error.message });
    }
  }
}

export default ProgressController;
