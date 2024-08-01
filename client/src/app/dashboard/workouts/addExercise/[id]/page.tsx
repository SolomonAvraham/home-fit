import { getWorkoutByIdAction } from "@/actions/workoutActions";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import ExerciseForm from "@/components/ui/forms/exerciseForm";
import { WorkoutIdProps } from "@/types/workout";

export default async function AddExercise(props: WorkoutIdProps) {
  const { id } = props.params;

  const workout = await getWorkoutByIdAction(id);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="grid     place-items-baseline">
        <h1 className="text-2xl font-bold">Add Exercise</h1>
        <div className="flex items-baseline gap-10">
          <span className=" flex-shrink-0"><WorkoutCard
            key={workout.id}
            workout={workout}
            operation={null}
          /></span>
          <ExerciseForm workoutId={id} />
        </div>
      </div>
    </div>
  );
}
