import { getWorkoutByIdAction } from "@/actions/workoutActions";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import ExerciseForm from "@/components/ui/forms/exercise/exerciseForm";
import { PropsParams } from "@/types/params";

export default async function AddExercise(props: PropsParams) {
  const { id } = props.params;

  const workout = await getWorkoutByIdAction(id);

  const currentPath = `/workouts/${workout.name}`;

  return (
    <div className="container mx-auto p-4 min-h-screen py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>
      <div className="text-center mt-5">
        <h1 className="text-6xl drop-shadow-lg cursor-default font-bold font-Acme text-center text-slate-100">
          Add Exercise
        </h1>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30" />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center gap-3 py-5 px-5">
        <WorkoutCard key={workout.id} workout={workout} operation={null} />
        <ExerciseForm workoutId={id} />
      </div>
    </div>
  );
}
