import Progress from "../models/Progress";
import { validate as validateUUID } from "uuid";

class ProgressService {
  async createProgress(data: {
    date: Date;
    userId: string;
    workoutId: string;
    performanceMetrics: object;
  }) {
    return await Progress.create(data);
  }

  async getProgressById(id: string) {
    if (!validateUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    return await Progress.findByPk(id);
  }

  async getAllProgress() {
    return await Progress.findAll();
  }

  async updateProgress(id: string, data: any) {
    if (!validateUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    const progress = await Progress.findByPk(id);
    if (!progress) {
      throw new Error("Progress not found");
    }
    return await progress.update(data);
  }

  async deleteProgress(id: string) {
    if (!validateUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    const progress = await Progress.findByPk(id);
    if (!progress) {
      return 0; // Returning 0 to indicate no progress was found
    }
    await progress.destroy();
    return 1; // Returning 1 to indicate progress was deleted
  }
}

export default new ProgressService();
