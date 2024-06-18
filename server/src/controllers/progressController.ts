import { Request, Response } from "express";
import ProgressService from "../services/progressService";

export default class ProgressController {
  static async createProgress(req: Request, res: Response) {
    try {
      const progress = await ProgressService.createProgress(req.body);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async getAllProgress(req: Request, res: Response) {
    try {
      const progress = await ProgressService.getAllProgress();
      res.status(200).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async getProgressById(req: Request, res: Response) {
    try {
      const progress = await ProgressService.getProgressById(req.params.id);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.status(200).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }
 
  static async updateProgress(req: Request, res: Response) {
    try {
      const progress = await ProgressService.updateProgress(
        req.params.id,
        req.body
      );
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.status(200).json(progress);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.log(error);
    }
  }

  static async deleteProgress(req: Request, res: Response) {
    try {
      const deleted = await ProgressService.deleteProgress(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Progress not found" });
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
