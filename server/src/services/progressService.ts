import Progress from "../models/Progress";

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
    return await Progress.findByPk(id);
  }

  async getAllProgress() {
    return await Progress.findAll();
  }

    async updateProgress(id: string, data: any) {
    const progress = await Progress.findByPk(id);
    if (!progress) {
      return null;
    }
    return progress.update(data);
  }

  async deleteProgress(id: string) {
    return await Progress.destroy({ where: { id } });
  }

  async trackProgress(data: any) {
    // Example logic: Save progress data to the database
    const progress = { id: 1, ...data }; // Simulate database save
    return progress;
  }
}

export default new ProgressService();
