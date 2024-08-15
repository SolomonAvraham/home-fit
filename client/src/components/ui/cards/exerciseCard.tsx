"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ExerciseAttributes } from "@/types/exercise";
import {
  UseAddExerciseToWorkoutMutation,
  UseDeleteExerciseMutation,
  UseIsExerciseInWorkoutQuery,
} from "@/lib/queries";
import useUserStore from "@/store/userStore";
import useConfirmStore from "@/store/confirmStore";
import Alert from "../alert/alert";
import Confirm from "../confirm/confirm";

interface ExerciseCardProps {
  exercise: ExerciseAttributes;
  operation?: string | null;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, operation }) => {
  const router = useRouter();
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<string>("");

  const { user } = useUserStore();

  const deleteExerciseMutation = UseDeleteExerciseMutation();
  const addExerciseToWorkoutMutation = UseAddExerciseToWorkoutMutation();
  const { data: workouts } = UseIsExerciseInWorkoutQuery(
    {
      exerciseId: exercise.id as string,
      userId: user?.id as string,
    },
    openCardId === exercise.id && !!exercise.id
  );

  const options = [
    {
      name: "view",
      label: "View",
      className: "btn btn-info",
      action: "view",
    },
    {
      name: "user",
      label: "View",
      className: "btn btn-info",
      action: "view",
    },
    {
      name: "user",
      label: "Edit",
      className: "btn btn-warning",
      action: "edit",
    },
    {
      name: "user",
      label: "Delete",
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
        router.push(`/dashboard/exercises/myExercises/${id}`);
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
                className={option.className}
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
                className={option.className}
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
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4">
      <Alert />
      <Confirm />
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{exercise.name}</h2>
        <p className="text-gray-600">{exercise.description}</p>
        {exercise.duration && (
          <p className="text-gray-700">
            <span className="font-semibold">Duration:</span> {exercise.duration}{" "}
            minutes
          </p>
        )}
        {exercise.sets && (
          <p className="text-gray-700">
            <span className="font-semibold">Sets:</span> {exercise.sets}
          </p>
        )}
        {exercise.reps && (
          <p className="text-gray-700">
            <span className="font-semibold">Reps:</span> {exercise.reps}
          </p>
        )}
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
        <div className="mt-4">
          <span className="font-semibold">Created By:</span>
          {exercise.createdBy?.map((creator) => (
            <p key={creator.creatorId} className="text-gray-700">
              {creator.creatorName}
            </p>
          ))}
        </div>
        {exercise.createdAt && (
          <p className="text-sm text-gray-500 mt-2">
            Created on: {new Date(exercise.createdAt).toLocaleDateString()}
          </p>
        )}
        {exercise.updatedAt && (
          <p className="text-sm text-gray-500">
            Updated on: {new Date(exercise.updatedAt).toLocaleDateString()}
          </p>
        )}
        <div className="card-actions justify-center mt-4">
          {renderButtons()}
        </div>
        <div className="card-actions flex flex-col items-center justify-center mt-4">
          <button
            className="btn btn-success mb-2"
            onClick={() =>
              setOpenCardId(
                openCardId === exercise.id ? null : (exercise.id as string)
              )
            }
          >
            {openCardId === exercise.id ? "Close" : "Add to Workout"}
          </button>
          {openCardId === exercise.id &&
            Array.isArray(workouts) &&
            workouts.length > 0 && (
              <div className="w-full flex flex-col items-center space-y-2">
                <select
                  className="select select-bordered w-full max-w-xs text-center"
                  value={selectedWorkout}
                  onChange={(e) => setSelectedWorkout(e.target.value)}
                >
                  <option disabled value="">
                    Select a workout
                  </option>
                  {workouts.map((workout) => (
                    <option key={workout.id} value={workout.id}>
                      {workout.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary w-full max-w-xs"
                  onClick={() =>
                    handleAddToWorkout(exercise.id as string, selectedWorkout)
                  }
                  disabled={!selectedWorkout}
                >
                  Add
                </button>
              </div>
            )}
        </div>{" "}
      </div>
    </div>
  );
};

export default ExerciseCard;
