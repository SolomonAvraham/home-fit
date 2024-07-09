import { Progress } from "../models/index";
import { validate as validateUUID } from "uuid";

class ProgressService {
  async createProgress(data: {
    date: Date;
    userId: string;
    workoutId: string;
    performanceMetrics: object;
  }) {
    try {
      const progress = await Progress.create(data);
      return progress;
    } catch (error) {
      console.error("Create Progress Service Error:", error);
      throw new Error("Failed to create progress");
    }
  }

  async getProgressById(id: string) {
    try {
      if (!validateUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const progress = await Progress.findByPk(id);
      if (!progress) {
        throw new Error("Progress not found");
      }
      return progress;
    } catch (error) {
      console.error("Get Progress By ID Service Error:", error);
      throw new Error("Failed to fetch progress");
    }
  }

  async getAllProgress() {
    try {
      const progress = await Progress.findAll();
      return progress;
    } catch (error) {
      console.error("Get All Progress Service Error:", error);
      throw new Error("Failed to fetch progress");
    }
  }

  async updateProgress(id: string, data: any) {
    try {
      if (!validateUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const progress = await Progress.findByPk(id);
      if (!progress) {
        throw new Error("Progress not found");
      }
      const updatedProgress = await progress.update(data);
      return updatedProgress;
    } catch (error) {
      console.error("Update Progress Service Error:", error);
      throw new Error("Failed to update progress");
    }
  }

  async deleteProgress(id: string) {
    try {
      if (!validateUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const progress = await Progress.findByPk(id);
      if (!progress) {
        return 0; // Indicate progress not found
      }
      await progress.destroy();
      return 1; // Indicate progress was deleted
    } catch (error) {
      console.error("Delete Progress Service Error:", error);
      throw new Error("Failed to delete progress");
    }
  }
}

export default new ProgressService();
