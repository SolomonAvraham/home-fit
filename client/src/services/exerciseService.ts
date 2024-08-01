import { ExerciseAttributes } from "@/types/exercise";
import axiosInstance from "../utils/axiosInstance";

const createExercise = async (
  exerciseData: ExerciseAttributes
): Promise<ExerciseAttributes> => {
  const response = await axiosInstance.post<ExerciseAttributes>(
    "/api/exercises/createExercise",
    exerciseData
  );
  return response.data;
};

const getAllExercises = async (): Promise<ExerciseAttributes[]> => {
  const response = await axiosInstance.get<ExerciseAttributes[]>(
    "/api/exercises/all"
  );
  return response.data;
};

const getExerciseById = async (id: string): Promise<ExerciseAttributes> => {
  const response = await axiosInstance.get<ExerciseAttributes>(
    `/api/exercises/getExerciseById/${id}`
  );
  return response.data;
};

const updateExercise =
  () =>
  async (
    id: string,
    exerciseData: ExerciseAttributes
  ): Promise<ExerciseAttributes> => {
    const response = await axiosInstance.put<ExerciseAttributes>(
      `/api/exercises/updateExercise/${id}`,
      exerciseData
    );
    return response.data;
  };

const deleteExercise =
  () =>
  async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/exercises/deleteExercise/${id}`);
  };

export {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
};
