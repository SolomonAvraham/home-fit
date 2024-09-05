"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ExerciseAttributes } from "@/types/exercise";
import {
  UseAddExerciseToWorkoutMutation,
  UseDeleteExerciseMutation,
  UseIsExerciseInWorkoutQuery,
  UseWorkoutsByUserIdQuery,
} from "@/lib/queries";
import useUserStore from "@/store/userStore";
import useConfirmStore from "@/store/confirmStore";
import AddExerciseButton from "../buttons/addExerciseButton";
import { FaRunning } from "react-icons/fa";

interface ExerciseCardProps {
  exercise: ExerciseAttributes;
  operation?: string | null;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, operation }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<string>("");

  const { user } = useUserStore();

  const deleteExerciseMutation = UseDeleteExerciseMutation();
  const addExerciseToWorkoutMutation = UseAddExerciseToWorkoutMutation();
  const { data: isWorkoutsExist } = UseIsExerciseInWorkoutQuery(
    {
      exerciseId: exercise.id as string,
      userId: user?.id as string,
    },
    openCardId === exercise.id
  );
  const { data: userWorkouts } = UseWorkoutsByUserIdQuery(
    user?.id as string,
    0,
    0
  );

  const userHasExercise = exercise.userId === user?.id;
  const disabledViewButton = pathName.includes(`/myExercises/${exercise.id}`);

  const options = [
    {
      name: "view",
      label: "View Exercise",
      className: "btn btn-info",
      action: "view",
    },
    {
      name: "user",
      label: "View Exercise",
      className: `btn btn-info ${disabledViewButton && "hidden"}`,
      action: "view",
    },
    {
      name: "user",
      label: "Edit Exercise",
      className: "btn btn-warning",
      action: "edit",
    },
    {
      name: "user",
      label: "Delete Exercise",
      className: "btn btn-error",
      action: "delete",
    },
  ];

  const handleOperation = async (id: string, action: string) => {
    switch (action) {
      case "delete": {
        const { triggerConfirm } = useConfirmStore.getState();

        const userConfirmed = await triggerConfirm(
          "Are you sure you want to delete this exercise?"
        );

        if (userConfirmed) {
          await deleteExerciseMutation.mutateAsync(id);
        }
        break;
      }

      case "edit":
        router.push(`/dashboard/exercises/edit/${id}`);
        break;
      case "view":
        userHasExercise
          ? router.push(`/dashboard/exercises/myExercises/${id}`)
          : router.push(`/dashboard/exercises/${id}`);
        break;
      default:
        console.log("Unknown operation:", action);
        break;
    }
  };

  const renderButtons = () => {
    switch (operation) {
      case null:
        return null;
      case "view":
        return options.map((option) => {
          return (
            option.name === "view" && (
              <button
                key={option.label}
                onClick={() =>
                  handleOperation(exercise.id as string, option.action)
                }
                className={`${option.className} `}
              >
                {option.label}
              </button>
            )
          );
        });
      case "user":
        return options.map((option) => {
          return (
            option.name === "user" && (
              <button
                key={option.label}
                onClick={() =>
                  handleOperation(exercise.id as string, option.action)
                }
                className={`${option.className} ${
                  !userHasExercise && "hidden"
                }  `}
              >
                {deleteExerciseMutation.isPending
                  ? "Deleting..."
                  : option.label}{" "}
              </button>
            )
          );
        });

      default:
    }
  };

  const handleAddToWorkout = async (exerciseId: string, workoutId: string) => {
    const { triggerConfirm } = useConfirmStore.getState();

    const userConfirmed = await triggerConfirm(
      "Are you sure you want to add this exercise to your workout?"
    );

    if (userConfirmed) {
      await addExerciseToWorkoutMutation.mutateAsync({
        exerciseId,
        workoutId,
      });

      setOpenCardId(null);
    }
  };

  return (
    <div className="card text-center w-80 bg-gray-800 shadow-md m-2 p-4 rounded-lg">
      <div className="flex justify-start gap-[0.11rem] text-sm mb-10 font-BebasNeue items-center  font-semibold ">
        <span>Created by:</span>
        <span>
          {" "}
          {exercise.createdBy?.[0]?.creatorId !== user?.id
            ? exercise.createdBy?.[0]?.creatorName
            : "You"}
        </span>
      </div>

      <div className="mx-auto">
        <FaRunning className="h-12 w-12" />
      </div>

      <div className="card-body text-center">
        <h2 className=" tracking-wide font-Acme text-2xl font-bold">
          {exercise.name}
        </h2>
        <hr className="border-gray-400 w-3/4 mx-auto opacity-30" />
        <p className="text-gray-400 text-sm">{exercise.description}</p>

        {exercise.duration && (
          <p className="text-gray-400 font-bold">
            <span className="font-semibold">Duration:</span> {exercise.duration}{" "}
            minutes
          </p>
        )}

        <div className="flex text-gray-400 font-bold items-center justify-center ">
          <p>
            <span className="font-semibold">Sets:</span> {exercise.sets}
          </p>

          <p>
            <span className="font-semibold">Reps:</span> {exercise.reps}
          </p>
        </div>

        {exercise.media && (
          <div className="mt-2">
            <iframe
              width="100%"
              height="200"
              src={exercise.media}
              title={`YouTube video player for ${exercise.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <hr />
          </div>
        )}

        <div className="card-actions grid grid-cols-2 place-items-center gap-8 py-10 sm:gap-4">
          {renderButtons()}

          <div
            className={`${disabledViewButton && "col-span-full"} ${
              !userHasExercise && operation !== "view" && "col-span-full"
            }`}
          >
            <AddExerciseButton
              exerciseId={exercise.id as string}
              userId={user?.id as string}
            />
          </div>

          <button
            className=" btn btn-success mb-2  col-span-full mt-5"
            onClick={() =>
              setOpenCardId(
                openCardId === exercise.id ? null : (exercise.id as string)
              )
            }
          >
            {openCardId === exercise.id ? "Close" : "Add Exercise to Workout"}
          </button>
          {openCardId === exercise.id && (
            <div className="w-full flex flex-col items-center space-y-2 col-span-full gap-5">
              <select
                className="select select-bordered w-full max-w-xs text-center"
                value={selectedWorkout}
                onChange={(e) => setSelectedWorkout(e.target.value)}
              >
                {!isWorkoutsExist && userWorkouts?.workouts.length > 0 ? (
                  <option disabled value="">
                    Already Added to Workouts
                  </option>
                ) : (
                  <option disabled value="">
                    Select a Workout
                  </option>
                )}
                {Array.isArray(isWorkoutsExist) &&
                  isWorkoutsExist.map((workout) => (
                    <option
                      key={workout.id}
                      value={workout.id}
                      disabled={!isWorkoutsExist}
                    >
                      {workout.name}
                    </option>
                  ))}
              </select>
              <button
                className="btn btn-primary w-full max-w-xs"
                onClick={() =>
                  handleAddToWorkout(exercise.id as string, selectedWorkout)
                }
                disabled={!selectedWorkout || !isWorkoutsExist}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
