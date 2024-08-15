import { getWorkoutByIdAction } from "@/actions/workoutActions";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import ExerciseForm from "@/components/ui/forms/exercise/exerciseForm";
import { PropsParams } from "@/types/params";
 
export default async function AddExercise(props: PropsParams) {
  const { id } = props.params;

  const workout = await getWorkoutByIdAction(id);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="grid place-items-center">
        <h1 className="text-2xl font-bold">Add Exercise</h1>
        <div className="flex items-baseline justify-center gap-10">
          <span className=" flex-shrink-0">
            <WorkoutCard key={workout.id} workout={workout} operation={null} />
          </span>
          <ExerciseForm workoutId={id} />
        </div>
      </div>
    </div>
  );
}
