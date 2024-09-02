import { UseAddWorkoutMutation, UseIsWorkoutExistQuery } from "@/lib/queries";

const AddWorkoutButton = ({
  workoutId,
  userId,
}: {
  workoutId: string;
  userId: string;
}) => {
  const {
    data: workoutExists,
    isLoading: isChecking,
    refetch,
  } = UseIsWorkoutExistQuery(workoutId, userId);

  const addWorkoutMutation = UseAddWorkoutMutation();

  const handleAddWorkout = async () => {
    if (!workoutExists) {
      await addWorkoutMutation.mutateAsync({ workoutId, userId });
      refetch();
    } else {
      console.log("Workout already exists", { workoutId, userId });
    }
  };

  return (
    <button
      onClick={handleAddWorkout}
      disabled={
        isChecking || workoutExists === true || addWorkoutMutation.isPending
      }
      className="btn btn-success"
    >
      {isChecking
        ? "Checking..."
        : workoutExists
        ? "Workout Added"
        : "Add Workout"}
    </button>
  );
};

export default AddWorkoutButton;
