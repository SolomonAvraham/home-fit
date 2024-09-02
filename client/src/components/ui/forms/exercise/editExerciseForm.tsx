"use client";

import { UseUpdateExerciseMutation } from "@/lib/queries";
import { ExerciseAttributes } from "@/types/exercise";
import React, { useState } from "react";

export default function EditExerciseForm({
  exerciseId,
  exerciseDetails,
}: {
  exerciseId: string;
  exerciseDetails: ExerciseAttributes;
}) {
  const [exercise, setExercise] = useState<ExerciseAttributes>({
    id: exerciseId,
    name: exerciseDetails.name,
    description: exerciseDetails.description,
    duration: exerciseDetails.duration,
    sets: exerciseDetails.sets,
    reps: exerciseDetails.reps,
    media: exerciseDetails.media,
    userId: exerciseDetails.userId,
    workoutId: exerciseDetails.workoutId,
    createdBy: exerciseDetails.createdBy,
    createdAt: exerciseDetails.createdAt,
    updatedAt: exerciseDetails.updatedAt,
  });

  const updateExerciseMutation = UseUpdateExerciseMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateExerciseMutation.mutateAsync({ ...exercise });
  };

  return (
    <div className="max-w-xs md:max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-box shadow-lg">
      <h2 className="text-center text-white text-3xl md:text-5xl font-Acme">
        Edit Exercise
      </h2>
      <hr className="bg-white w-full opacity-25 mt-3" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control mt-5">
          <label className="label" htmlFor="name">
            <span className="label-text mx-auto font-bold">Exercise Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={exercise.name}
            onChange={handleChange}
            placeholder={exerciseDetails.name}
            className="input input-bordered w-full text-center"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="description">
            <span className="label-text mx-auto font-bold">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={exercise.description}
            onChange={handleChange}
            placeholder={exerciseDetails.description}
            className="textarea textarea-bordered h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-control col-span-2">
            <label className="label" htmlFor="duration">
              <span className="label-text mx-auto font-bold">
                Duration (minutes)
              </span>
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={exercise.duration}
              onChange={handleChange}
              placeholder={exerciseDetails.duration?.toString()}
              min={0}
              className="input input-bordered w-full text-center"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="sets">
              <span className="label-text mx-auto font-bold">Sets</span>
            </label>
            <input
              type="number"
              id="sets"
              name="sets"
              value={exercise.sets}
              onChange={handleChange}
              placeholder={exerciseDetails.sets?.toString()}
              min={0}
              className="input input-bordered w-full text-center"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="reps">
              <span className="label-text mx-auto font-bold">Reps</span>
            </label>
            <input
              type="number"
              id="reps"
              name="reps"
              value={exercise.reps}
              onChange={handleChange}
              placeholder={exerciseDetails.reps?.toString()}
              min={0}
              className="input input-bordered w-full text-center"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="media">
            <span className="label-text mx-auto font-bold">Media</span>
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={exercise.media}
            onChange={handleChange}
            placeholder={exerciseDetails.media}
            className="input input-bordered w-full text-center"
          />
        </div>

        <div className="form-control py-5">
          <button
            type="submit"
            className="btn btn-success text-white font-Acme text-2xl"
          >
            Update Exercise
          </button>
        </div>
      </form>
    </div>
  );
}
