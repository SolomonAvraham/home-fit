import { getWorkouts } from "@/services/workoutService";
import { useQuery } from "@tanstack/react-query";

export function UseWorkoutQuery() {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      return await getWorkouts();
    },
  });
}
