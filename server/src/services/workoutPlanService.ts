import WorkoutPlan from "../models/WorkoutPlan";

class WorkoutPlanService {
  async createWorkoutPlan(data: {
    name: string;
    description: string;
    userId: string;
  }) {
    return await WorkoutPlan.create(data);
  }

  async getWorkoutPlanById(id: string) {
    return await WorkoutPlan.findByPk(id);
  }

  async getAllWorkoutPlans() {
    try {
      const workoutPlans = await WorkoutPlan.findAll();
      return workoutPlans;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Could not fetch workout plans");
    }
  }

  async updateWorkoutPlan(
    id: string,
    data: { name?: string; description?: string }
  ) {
    return await WorkoutPlan.update(data, { where: { id } });
  }

  async deleteWorkoutPlan(id: string) {
    return await WorkoutPlan.destroy({ where: { id } });
  }
}

export default new WorkoutPlanService();
