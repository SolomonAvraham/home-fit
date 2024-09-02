import { UseAddExerciseMutation, UseIsExerciseExistQuery } from "@/lib/queries";

const AddExerciseButton = ({
  exerciseId,
  userId,
}: {
  exerciseId: string;
  userId: string;
}) => {
  const addExerciseMutation = UseAddExerciseMutation();
  const {
    data: exerciseExists,
    isLoading: isChecking,
    refetch,
  } = UseIsExerciseExistQuery(exerciseId, userId);

  const handleAddExercise = async () => {
    try {
      if (!exerciseExists) {
        const addExercise = await addExerciseMutation.mutateAsync({
          exerciseId,
          userId,
        });

         if (addExercise) {
          refetch();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleAddExercise}
      disabled={isChecking || !!exerciseExists || addExerciseMutation.isPending}
      className="btn  btn-primary"
    >
      {isChecking
        ? "Checking..."
        : exerciseExists
        ? "Exercise Added"
        : "Add Exercise"}
    </button>
  );
};

export default AddExerciseButton;
