import { getWorkoutByIdAction } from "@/actions/workoutActions";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import { PropsParams } from "@/types/params";

export default async function WorkoutId(props: PropsParams) {
  const { id } = props.params;

  const workout = await getWorkoutByIdAction(id);
  const currentPath = `/dashboard/workouts/myWorkouts/${workout.name}`;

  return (
    <div className="container  min-h-screen  mx-auto py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>
      <div className="py-20 grid place-items-center">
        <WorkoutCard key={workout.id} workout={workout} operation={null} />
      </div>
    </div>
  );
}
