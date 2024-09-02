import WorkoutCard from "@/components/ui/cards/workoutCard";
import { getWorkoutById } from "@/services/workoutService";
import { WorkoutIdProps } from "@/types/workout";

export default async function WorkoutId(props: WorkoutIdProps) {
  const { id } = props.params;

  const workout = await getWorkoutById(id);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">Workout</h1>

      <div className="flex items-center justify-center">
        <WorkoutCard
          key={workout.id}
          workout={workout}
          operation={null}
        />
      </div>
    </div>
  );
}
