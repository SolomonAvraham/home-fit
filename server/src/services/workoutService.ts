import Workout from "../models/Workout";
import { v4 as uuidv4 } from "uuid";

class WorkoutService {
  async createWorkout(data: {
    date: Date;
    duration: number;
    userId: string;
    workoutPlanId: string;
  }) {
    try {
      const workoutData = {
        id: uuidv4(), // Generate the ID here
        ...data,
      };
      console.log("Service: Creating workout with data:", workoutData);
      const workout = await Workout.create(workoutData);
      return workout;
    } catch (error) {
      console.error("Create Workout Service Error:", error);
      throw new Error("Failed to create workout");
    }
  }

  async getWorkoutById(id: string) {
    try {
      console.log("Service: Fetching workout by ID:", id);
      const workout = await Workout.findByPk(id);
      if (!workout) {
        throw new Error("Workout not found");
      }
      return workout;
    } catch (error) {
      console.error("Get Workout By ID Service Error:", error);
      throw new Error("Workout not found");
    }
  }

  async getAllWorkouts() {
    try {
      console.log("Service: Fetching all workouts");
      const workouts = await Workout.findAll();
      return workouts;
    } catch (error) {
      console.error("Get All Workouts Service Error:", error);
      throw new Error("Failed to fetch workouts");
    }
  }

  async updateWorkout(
    id: string,
    data: Partial<{
      date: Date;
      duration: number;
      userId: string;
      workoutPlanId: string;
    }>
  ) {
    try {
      console.log("Service: Updating workout with ID:", id, "with data:", data);
      const workout = await Workout.findByPk(id);
      if (!workout) {
        throw new Error("Workout not found");
      }
      await workout.update(data);
      return workout;
    } catch (error) {
      console.error("Update Workout Service Error:", error);
      throw new Error("Failed to update workout");
    }
  }

  async deleteWorkout(id: string) {
    try {
      console.log("Service: Deleting workout with ID:", id);
      const workout = await Workout.findByPk(id);
      if (!workout) {
        return 0; // Indicate workout not found
      }
      await workout.destroy();
      return 1; // Indicate workout was deleted
    } catch (error) {
      console.error("Delete Workout Service Error:", error);
      throw new Error("Failed to delete workout");
    }
  }
}

export default new WorkoutService();
