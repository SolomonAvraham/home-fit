"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { WorkoutProps } from "@/types/workout";
import { UseDeleteWorkoutMutation } from "@/lib/queries";
import useUserStore from "@/store/userStore";
import AddWorkoutButton from "../buttons/addWorkoutButton";
import useConfirmStore from "@/store/confirmStore";
import { GiWeightLiftingUp } from "react-icons/gi";
import ExerciseCard from "./exerciseCard";

export default function WorkoutCard({
  workout,
  operation,
}: {
  workout: WorkoutProps;
  operation: string | null;
}) {
  const router = useRouter();
  const { user } = useUserStore();
  const showCreatedBy = usePathname().includes("addExercise");

  const deleteWorkoutMutation = UseDeleteWorkoutMutation();

  const [showDetails, setShowDetails] = useState(false);

  const options = [
    {
      name: "viewUnsigned",
      label: "View",
      className: "btn btn-info",
      action: "viewUnsigned",
    },
    {
      name: "view",
      label: "View Workout",
      className: "btn btn-info",
      action: "view",
    },
    {
      name: "edit",
      label: "Edit Workout",
      className: "btn btn-warning",
      action: "edit",
    },
    {
      name: "delete",
      label: "Delete Workout",
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

  const handleOperation = async (id: string, action: string) => {
    switch (action) {
      case "delete": {
        const { triggerConfirm } = useConfirmStore.getState();

        const userConfirmed = await triggerConfirm(
          "Are you sure you want to delete this workout?"
        );

        if (userConfirmed) {
          await deleteWorkoutMutation.mutateAsync(id);
        }

        break;
      }
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
                className={`${option.className}  disabled:text-gray-400 disabled:bg-gray-700 disabled:cursor-not-allowed`}
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
    <div className="card text-center w-80 bg-gray-800 shadow-md m-2 p-4 rounded-lg">
      {" "}
      {!showCreatedBy && (
        <div className="flex justify-start gap-[0.11rem] text-sm mb-10 font-BebasNeue items-center  font-semibold ">
          <span>Created by:</span>
          <span>
            {" "}
            {workout.createdBy?.[0]?.creatorId !== user?.id
              ? workout.createdBy?.[0]?.creatorName
              : "You"}
          </span>
        </div>
      )}
      <div className="mx-auto">
        <GiWeightLiftingUp className="h-12 w-12" />
      </div>
      <div className="card-body text-center">
        <h2 className=" tracking-wide font-Acme text-2xl font-bold">
          {workout.name}
        </h2>
        <hr className="border-gray-400 w-3/4 mx-auto opacity-30" />
        <p className="text-gray-400 text-sm">{workout.description}</p>
        <p className="text-gray-400 font-bold">
          {" "}
          <span className="font-semibold">Duration:</span> {workout.duration}{" "}
 
        </p>

        <div
          className={`card-actions grid ${
            operation === "view" && "grid-cols-2 "
          } mx-auto py-10 gap-4`}
        >
          {renderButtons()}{" "}
          {user && operation !== "view" && (
            <span className={`${!operation && "col-span-full"} `}>
              <AddWorkoutButton
                workoutId={workout.id as string}
                userId={user.id as string}
              />
            </span>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            disabled={!workout.exercises?.[0]}
            className="btn btn-primary col-span-full"
          >
            {showDetails
              ? "Hide Exercises"
              : `View Exercises(${workout.exercises?.length})`}
          </button>{" "}
        </div>
        {showDetails && (
          <div className="mt-5  ">
            <hr className="border-gray-400 w-3/4 mx-auto opacity-30" />
            <div className="py-3 flex flex-col items-center justify-center p-1  ">
              {workout.exercises?.map((exercise, i: number) => (
                <ExerciseCard key={i} exercise={exercise} operation="view" />
              ))}
            </div>
            <hr className="border-gray-400 w-3/4 mx-auto opacity-30" />
          </div>
        )}
      </div>
    </div>
  );
}
