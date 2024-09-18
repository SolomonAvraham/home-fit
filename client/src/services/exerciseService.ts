import { ExerciseAttributes, PaginatedExercises } from "@/types/exercise";
import axiosInstance from "../utils/axiosInstance";

export const createExercise = async (
  exerciseData: ExerciseAttributes
): Promise<ExerciseAttributes> => {
  const response = await axiosInstance.post<ExerciseAttributes>(
    "/api/exercises/createExercise",
    exerciseData
  );
  return response.data;
};

export const getAllExercises = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedExercises> => {
  const response = await axiosInstance.get<PaginatedExercises>(
    `/api/exercises/all?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getExercisesByUserId = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedExercises> => {
  const response = await axiosInstance.get<PaginatedExercises>(
    `/api/exercises/user/${userId}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getExerciseById = async (
  id: string,
  token: string | undefined
): Promise<ExerciseAttributes> => {
  console.log("🚀 ~ token:", token)
  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  };

  const response = await axiosInstance.get<ExerciseAttributes>(
    `/api/exercises/getExerciseById/${id}`,
     config
  );

  return response.data;
};

export const updateExercise = async (
  exerciseData: ExerciseAttributes
): Promise<ExerciseAttributes> => {
  const response = await axiosInstance.put<ExerciseAttributes>(
    `/api/exercises/updateExercise/${exerciseData.id}`,
    exerciseData
  );
  return response.data;
};

export const deleteExercise = async (id: string): Promise<void> => {
  const response = await axiosInstance.delete(
    `/api/exercises/deleteExercise/${id}`
  );
  return response.data;
};

export const addExercise = async (data: {
  exerciseId: string;
  userId: string;
}) => {
  const { exerciseId, userId } = data;

  const response = await axiosInstance.post(
    `/api/exercises/${exerciseId}/user/${userId}/add`
  );
  return response.data;
};

export const addExerciseToWorkout = async (data: {
  exerciseId: string;
  workoutId: string;
}) => {
  const { exerciseId, workoutId } = data;

  const response = await axiosInstance.post(
    `/api/exercises/${exerciseId}/workouts/${workoutId}/add`
  );
  return response.data;
};

export const isExerciseInWorkout = async (data: {
  exerciseId: string;
  userId: string;
}): Promise<ExerciseAttributes> => {
  const { exerciseId, userId } = data;
  const response = await axiosInstance.get<ExerciseAttributes>(
    `/api/exercises/isExerciseInWorkout/${exerciseId}/user/${userId}`
  );
  return response.data;
};

export const isExerciseExist = async (data: {
  exerciseId: string;
  userId: string;
}): Promise<ExerciseAttributes> => {
  const { exerciseId, userId } = data;
  const response = await axiosInstance.get<ExerciseAttributes>(
    `/api/exercises/isExerciseExist/${exerciseId}/user/${userId}`
  );
  return response.data;
};