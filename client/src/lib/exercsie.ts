import { getExerciseById } from "@/services/exerciseService";

export async function fetchExerciseById(id: string) {
  const response = await getExerciseById(id);
  if (!response) {
    throw new Error("Exercise not found");
  }

  return response;
}
