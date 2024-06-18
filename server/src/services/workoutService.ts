import Workout from "../models/Workout";

class WorkoutService {
  async createWorkout(data: {
    date: Date;
    duration: number;
    userId: string;
    workoutPlanId: string;
  }) {
    return await Workout.create(data);
  }

  async getWorkoutById(id: string) {
    return await Workout.findByPk(id);
  }

  async getAllWorkouts() {
    return await Workout.findAll();
  }

  async updateWorkout(id: string, data: { date?: Date; duration?: number }) {
    return await Workout.update(data, { where: { id } });
  }

  async deleteWorkout(id: string) {
    return await Workout.destroy({ where: { id } });
  }
}

export default new WorkoutService();
