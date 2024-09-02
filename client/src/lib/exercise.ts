import { getExerciseById } from "@/services/exerciseService";
import { cookies } from "next/headers";

export async function fetchExerciseById(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const response = await getExerciseById(id, token);

  return response;
}
