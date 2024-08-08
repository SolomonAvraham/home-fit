"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExerciseAttributes } from "@/types/exercise";
import { WorkoutProps } from "@/types/workout";
import { UseDeleteWorkoutMutation } from "@/lib/queries";
import useUserStore from "@/store/userStore";
import AddWorkoutButton from "../buttons/addWorkout";
import useConfirmStore from "@/store/confirmStore";

export default function WorkoutCard({
  workout,
  operation,
}: {
  workout: WorkoutProps;
  operation: string | null;
}) {
  const router = useRouter();
  const { user } = useUserStore();
  const { triggerConfirm, confirm, message, setConfirm, data } =
    useConfirmStore();

  const deleteWorkoutMutation = UseDeleteWorkoutMutation();

  const [showDetails, setShowDetails] = useState(false);

  const options = [
    {
      name: "viewUnsigned",
      label: "View",
      className: "btn btn-info",
      action: "viewUnsigned",
    },
    { name: "view", label: "View", className: "btn btn-info", action: "view" },
    {
      name: "edit",
      label: "Edit",
      className: "btn btn-warning",
      action: "edit",
    },
    {
      name: "delete",
      label: "Delete",
      className: "btn btn-error",
      action: "delete",
    },
    {
      name: "addExercise",
      label: "Add Exercise",
      className: "btn btn-success",
      action: "addExercise",
    },
  ];

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const handleOperation = async (id: string, action: string) => {
    switch (action) {
      case "delete":
        triggerConfirm(
          "Are you sure you want to delete this workout?",
          { id },
          async () => {
            await deleteWorkoutMutation.mutateAsync(id);
          }
        );
        break;
      case "edit":
        router.push(`/dashboard/workouts/edit/${id}`);
        break;
      case "view":
        router.push(`/dashboard/workouts/myWorkouts/${id}`);
        break;
      case "viewUnsigned":
        router.push(`/workouts/${id}`);
        break;
      case "addExercise":
        router.push(`/dashboard/workouts/addExercise/${id}`);
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
      case "viewUnsigned":
        return options.map((option, i: number) => {
          return (
            option.name === "viewUnsigned" && (
              <button
                key={i}
                onClick={() =>
                  handleOperation(workout.id as string, option.action)
                }
                className={`${option.className} disabled:text-gray-400 disabled:bg-gray-700 disabled:cursor-not-allowed`}
              >
                {option.label}
              </button>
            )
          );
        });
      case "delete":
        return options.map((option) => {
          return (
            option.name === "delete" && (
              <button
                key={option.name}
                onClick={() =>
                  handleOperation(workout.id as string, option.action)
                }
                className={option.className}
              >
                {deleteWorkoutMutation.isPending ? "Deleting..." : option.label}{" "}
              </button>
            )
          );
        });
      case "edit":
        return options.map((option) => {
          return (
            option.name === "edit" && (
              <button
                key={option.name}
                onClick={() =>
                  handleOperation(workout.id as string, option.action)
                }
                className={option.className}
              >
                {option.label}
              </button>
            )
          );
        });
      case "view":
        return options.map((option) => {
          return (
            option.name !== "viewUnsigned" && (
              <button
                key={option.name}
                onClick={() =>
                  handleOperation(workout.id as string, option.action)
                }
                className={option.className}
              >
                {option.name === "delete" && deleteWorkoutMutation.isPending
                  ? "Deleting..."
                  : option.label}
              </button>
            )
          );
        });

      default:
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4">
      <div className="card-body items-center justify-center text-center">
        <h4 className="font-semibold text-gray-300 capitalize  ">
          Created By:{" "}
          {workout.createdBy?.[0]?.creatorId !== user?.id
            ? workout.createdBy?.[0]?.creatorName
            : "You"}
        </h4>

        <h2 className="card-title">{workout.name}</h2>
        <p>Duration: {workout.duration}</p>

        <p className="text-sm">Description: {workout.description}</p>
        <div className="card-actions justify-center">
          {renderButtons()}{" "}
          {user && operation !== "view" && (
            <AddWorkoutButton
              workoutId={workout.id as string}
              userId={user.id}
            />
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn btn-primary"
          >
            {showDetails
              ? "Hide Exercises"
              : `View Exercises(${workout.exercises?.length})`}
          </button>{" "}
        </div>
        {showDetails && (
          <div className="mt-4">
            <hr />
            <h3 className="font-bold mt-4 mb-2">Exercises:</h3>
            <ul className="space-y-4">
              {workout.exercises?.map(
                (exercise: ExerciseAttributes, index: number) => (
                  <li key={index} className="border-b pb-2 font-extrabold">
                    <h4 className="font-semibold"> Name: {exercise.name}</h4>
                    <p>Description: {exercise.description}</p>
                    <p>
                      {exercise.sets} sets,{" "}
                      {exercise.reps
                        ? `${exercise.reps} reps`
                        : exercise.duration}
                    </p>
                    {exercise.media && getYoutubeEmbedUrl(exercise.media) && (
                      <div className="mt-2">
                        {" "}
                        <iframe
                          width="100%"
                          height="200"
                          src={getYoutubeEmbedUrl(exercise.media) || ""}
                          title={`YouTube video player for ${exercise.name}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <hr />
                      </div>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
