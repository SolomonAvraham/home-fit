"use client";

import { getWorkoutByIdAction } from "@/actions/workoutActions";
import {
  UseDeleteExerciseMutation,
  UseUpdateWorkoutMutation,
} from "@/lib/queries";
import useConfirmStore from "@/store/confirmStore";
import { WorkoutProps } from "@/types/workout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EditWorkoutForm({
  workoutId,
  workoutDetails,
}: {
  workoutId: string;
  workoutDetails: WorkoutProps;
}) {
  const router = useRouter();
  const [workout, setWorkout] = useState<WorkoutProps>({
    id: workoutId,
    duration: workoutDetails.duration,
    description: workoutDetails.description,
    name: workoutDetails.name,
  });

  const updateWorkoutMutation = UseUpdateWorkoutMutation();
  const deleteExerciseMutation = UseDeleteExerciseMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateWorkoutMutation.mutateAsync(workout);
  };

  const deleteExercise = async (id: string) => {
    const { triggerConfirm } = useConfirmStore.getState();

    const userConfirmed = await triggerConfirm(
      "Are you sure you want to remove this exercise?"
    );

    if (userConfirmed) {
      await deleteExerciseMutation.mutateAsync(id);
    }
    router.refresh();
  };

  return (
    <div
      className={`max-w-sm ${
        workoutDetails.exercises?.[0] && "md:w-[41rem] md:max-h-full"
      }  md:max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-box shadow-lg`}
    >
      <h2 className="text-center text-white text-3xl md:text-5xl font-Acme">
        Edit Workout
      </h2>
      <form
        onSubmit={handleSubmit}
        action={() => getWorkoutByIdAction(workoutId)}
        className={`space-y-4 grid  ${
          workoutDetails.exercises?.[0] && "md:grid-cols-2 md:gap-11"
        }`}
      >
        <div className="">
          {" "}
          <div className="form-control">
            <label className="label  mx-auto font-bold" htmlFor="name">
              <span className="label-text">Workout Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={workout.name}
              onChange={handleChange}
              placeholder={workoutDetails.name}
              min={2}
              required
              className="input input-bordered w-full text-center"
            />
          </div>
          <div className="form-control">
            <label className="label mx-auto font-bold" htmlFor="description">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={workout.description}
              onChange={handleChange}
              placeholder={workoutDetails.description}
              required
              minLength={10}
              className="textarea textarea-bordered h-24"
            />
          </div>
          <div className="form-control mt-6 ">
            <button
              type="submit"
              className="btn btn-success text-white font-Acme text-2xl"
            >
              Update Workout
            </button>
          </div>
        </div>

        {workoutDetails.exercises?.[0] ? (
          <div className="flex flex-col items-center py-2">
            <h2 className="text-center text-white text-3xl md:text-xl font-Acme md:py-2">
              Remove Exercises{" "}
            </h2>

            <table className="rounded bg-slate-700 text-white text-center w-full p-5">
              <thead className="text-center">
                <tr>
                  <th>Name</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto w-full">
                {workoutDetails.exercises?.map((exercise) => (
                  <tr
                    key={exercise.id}
                    className="text-center border-t-[1px] border-gray-500"
                  >
                    <td>{exercise.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-error btn-xs btn-block tracking-wides text-white"
                        onClick={() => deleteExercise(exercise.id as string)}
                      >
                        {deleteExerciseMutation.isPending
                          ? "Deleting..."
                          : "Remove"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="gap-3 flex flex-col md:flex-row justify-center">
            <button
              type="button"
              className="btn btn-outline  text-white font-Acme text-2xl"
              onClick={() =>
                router.push(`/dashboard/workouts/addExercise/${workoutId}`)
              }
            >
              Create Exercise to Workout
            </button>{" "}
            <button
              type="button"
              className="btn btn-outline text-white font-Acme text-2xl"
              onClick={() => router.push(`/dashboard/exercises`)}
            >
              Add Exercises
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
