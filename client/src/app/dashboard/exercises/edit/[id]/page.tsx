import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import EditExerciseForm from "@/components/ui/forms/exercise/editExerciseForm";
import { fetchExerciseById } from "@/lib/exercise";
import { PropsParams } from "@/types/params";

export default async function EditExercise(props: PropsParams) {
  const { id } = props.params;
  const exercise = await fetchExerciseById(id);
  const currentPath = `/dashboard/exercises/${exercise.name}`;

  return (
    <div className="container min-h-screen mx-auto  py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>{" "}
      
      <div className="py-5 grid place-items-center ">
        <EditExerciseForm exerciseId={id} exerciseDetails={exercise} />
      </div>{" "}
    </div>
  );
}
