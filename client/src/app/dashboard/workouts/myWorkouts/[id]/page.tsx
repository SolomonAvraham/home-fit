import { getWorkoutByIdAction } from "@/actions/workoutActions";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import { PropsParams } from "@/types/params";

export default async function WorkoutId(props: PropsParams) {
  const { id } = props.params;

  const workout = await getWorkoutByIdAction(id);

  return (
    <div className="container  min-h-screen  flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-10">{workout.name}</h1>

      <span className="flex-1 ">
        {" "}
        <WorkoutCard key={workout.id} workout={workout} operation={null} />
      </span>
    </div>
  );
}
