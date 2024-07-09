import axiosInstance from "../utils/axiosInstance";

export const getWorkouts = async () => {
  const response = await axiosInstance.get("/api/workouts/all");
  return response.data;
};

export const getWorkoutById = async (id: string) => {
  const response = await axiosInstance.get(`/api/workouts/workoutById/${id}`);
  return response.data;
};

export const createWorkout = async (workout: {
  name: string;
  description: string;
  duration: number;
  userId: string;
  workoutPlanId: string;
}) => {
  const response = await axiosInstance.post("/workouts", workout);
  return response.data;
};

export const updateWorkout = async (
  id: string,
  workout: {
    name?: string;
    description?: string;
    duration?: number;
    workoutPlanId?: string;
  }
) => {
  const response = await axiosInstance.put(`/workouts/${id}`, workout);
  return response.data;
};

export const deleteWorkout = async (id: string) => {
  const response = await axiosInstance.delete(`/workouts/${id}`);
  return response.data;
};
