import WorkoutCard from "@/components/ui/cards/workoutCard";
import ExerciseForm from "@/components/ui/forms/exerciseForm";
import { getWorkoutById } from "@/services/workoutService";
import { WorkoutIdProps } from "@/types/workout";

export default async function WorkoutId(props: WorkoutIdProps) {
  const { id } = props.params;

  async function responseAction() {
    "use server";

    const response = await getWorkoutById(id);
    return response;
  }

  const response = await responseAction();
  console.log("🚀 ~ WorkoutId ~ response:", response);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">Exercises</h1>

      <div className="grid grid-cols-2  grid-flow-row place-items-baseline">
        {/* <ExerciseForm workoutId={"id"} response={response} /> */}
      </div>
    </div>
  );
}
