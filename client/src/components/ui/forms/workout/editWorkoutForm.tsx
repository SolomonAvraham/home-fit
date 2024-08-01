"use client";

import { UseUpdateWorkoutMutation } from "@/lib/queries";
import { WorkoutProps } from "@/types/workout";
import React, { useState } from "react";

export default function EditWorkoutForm({
  workoutId,
  workoutDetails,
}: {
  workoutId: string;
  workoutDetails: WorkoutProps;
}) {
  const [workout, setWorkout] = useState<WorkoutProps>({
    id: workoutId,
    duration: workoutDetails.duration,
    description: workoutDetails.description,
    name: workoutDetails.name,
  });

  const updateWorkoutMutation = UseUpdateWorkoutMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateWorkoutMutation.mutateAsync(workout);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-base-200 rounded-box shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Workout Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={workout.name}
            onChange={handleChange}
            placeholder={workoutDetails.name}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="description">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={workout.description}
            onChange={handleChange}
            placeholder={workoutDetails.description}
            required
            className="textarea textarea-bordered h-24"
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Update Workout
          </button>
        </div>
      </form>
    </div>
  );
}
