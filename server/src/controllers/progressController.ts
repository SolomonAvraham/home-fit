import { Request, Response } from "express";
import ProgressService from "../services/progressService";

export default class ProgressController {
  static async createProgress(req: Request, res: Response): Promise<Response> {
    try {
      const progress = await ProgressService.createProgress(req.body);
      return res.status(201).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getAllProgress(req: Request, res: Response): Promise<Response> {
    try {
      const progress = await ProgressService.getAllProgress();
      return res.status(200).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getProgressById(req: Request, res: Response): Promise<Response> {
    try {
      const progress = await ProgressService.getProgressById(req.params.id);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      return res.status(200).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateProgress(req: Request, res: Response): Promise<Response> {
    try {
      const progress = await ProgressService.updateProgress(
        req.params.id,
        req.body
      );
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      return res.status(200).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteProgress(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await ProgressService.deleteProgress(id);

      if (!deleted) {
        return res.status(404).json({ message: "Progress not found" });
      }

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
