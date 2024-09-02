import { WorkoutProps } from "@/types/workout";
import axiosInstance from "../utils/axiosInstance";

export const isWorkoutExist = async (workoutId: string, userId: string) => {
  const response = await axiosInstance.get(
    `/api/workouts/isWorkoutExist/?workoutId=${workoutId}&userId=${userId}`
  );
  return response.data;
};

export const getWorkouts = async (page: number = 1, limit: number = 10) => {
  const response = await axiosInstance.get(
    `/api/workouts/all?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getWorkoutById = async (id: string) => {
  const response = await axiosInstance.get(`/api/workouts/workoutById/${id}`);
  return response.data;
};

export const getWorkoutsByUserId = async (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  const response = await axiosInstance.get(
    `/api/workouts/WorkoutsByUserId/${userId}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const createWorkout = async (workout: WorkoutProps) => {
  const response = await axiosInstance.post(
    "/api/workouts/createWorkout",
    workout
  );
  return response.data;
};

export const addWorkout = async ({
  workoutId,
  userId,
}: {
  workoutId: string;
  userId: string;
}) => {
  const response = await axiosInstance.post(
    `/api/workouts/addWorkout/${workoutId}/user/${userId}`
  );
  return response.data;
};

export const updateWorkout = async (workout: WorkoutProps) => {
  const response = await axiosInstance.put(
    `/api/workouts/updateWorkout/${workout.id}`,
    workout
  );
  return response.data;
};

export const deleteWorkout = async (id: string) => {
  const response = await axiosInstance.delete(
    `/api/workouts/deleteWorkout/${id}`
  );
  return response.data;
};
