import { getUserById } from "@/services/userService";
import { cookies } from "next/headers";

export async function fetchUserById(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const response = await getUserById(id, token);

  return response;
}
