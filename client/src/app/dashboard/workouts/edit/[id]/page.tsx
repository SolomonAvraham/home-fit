import { getWorkoutByIdAction } from "@/actions/workoutActions";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import EditWorkoutForm from "@/components/ui/forms/workout/editWorkoutForm";
import { PropsParams } from "@/types/params";

export default async function EditWorkout({ params }: PropsParams) {
  const { id } = params;
  const workout = await getWorkoutByIdAction(id);
  const currentPath = `dashboard/workouts/myWorkouts/${workout.name}`;

  return (
    <div className="container  min-h-screen mx-auto  py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>{" "}
      <div className="py-5 grid place-items-center ">
        <EditWorkoutForm workoutId={workout.id} workoutDetails={workout} />
      </div>
    </div>
  );
}
