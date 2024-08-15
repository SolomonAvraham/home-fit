import { getWorkoutByIdAction } from "@/actions/workoutActions";
import EditWorkoutForm from "@/components/ui/forms/workout/editWorkoutForm";
import { PropsParams } from "@/types/params";

export default async function EditWorkout({ params }: PropsParams) {
  const { id } = params;
  const workout = await getWorkoutByIdAction(id);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Workout</h1>
      <EditWorkoutForm workoutId={workout.id} workoutDetails={workout} />
    </div>
  );
}
