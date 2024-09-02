import EditExerciseForm from "@/components/ui/forms/exercise/editExerciseForm";
import { fetchExerciseById } from "@/lib/exercsie";
import { PropsParams } from "@/types/params";

export default async function EditExercise(props: PropsParams) {
  const { id } = props.params;
  const exercise = await fetchExerciseById(id);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Exercise</h1>
      <EditExerciseForm exerciseId={id} exerciseDetails={exercise} />
    </div>
  );
}
