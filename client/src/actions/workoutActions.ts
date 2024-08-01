"use server";

import { getWorkoutById } from "@/services/workoutService";

export async function getWorkoutByIdAction(id: string) {
  const response = await getWorkoutById(id);
  return response;
}
