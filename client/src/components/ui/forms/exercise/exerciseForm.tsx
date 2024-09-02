"use client";

import { getWorkoutByIdAction } from "@/actions/workoutActions";
import { UseCreateExerciseMutation } from "@/lib/queries";
import useUserStore from "@/store/userStore";
import { ExerciseAttributes } from "@/types/exercise";
 import { useEffect, useRef, useState } from "react";

const ExerciseForm = ({ workoutId }: { workoutId: string }) => {
   const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUserStore();

  const [exercise, setExercise] = useState<ExerciseAttributes>({
    name: "",
    description: "",
    duration: 0,
    sets: 0,
    reps: 0,
    media: "",
    workoutId: workoutId !== "" ? workoutId : undefined,
    userId: "",
    createdBy: [{ creatorId: "", creatorName: "", originalExerciseId: "" }],
  });

  useEffect(() => {
    if (user) {
      setExercise((prevExercise) => ({
        ...prevExercise,
        userId: user.id,
        createdBy: [
          {
            creatorId: user.id,
            creatorName: user.name,
            originalExerciseId: "",
          },
        ],
      }));
    }
  }, [user]);

  const createExerciseMutation = UseCreateExerciseMutation(
    formRef,
    setExercise
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (workoutId !== "") {
      exercise.workoutId = workoutId;
    }

    const formData = new FormData();
    Object.entries(exercise).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    await createExerciseMutation.mutateAsync(exercise);
  };

  return (
    <div className="max-w-md   mx-auto mt-8 p-6 bg-gray-800 rounded-box shadow-lg">
      <h2 className="text-center text-white text-3xl md:text-5xl font-Acme">
        Create Exercise
      </h2>
      <hr className="bg-white w-full opacity-25 mt-3" />

      <form
        action={() => getWorkoutByIdAction}
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="form-control mt-5">
          {" "}
          <label className="label" htmlFor="name">
            <span className="label-text  mx-auto font-bold">Exercise Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={exercise.name}
            onChange={handleChange}
            placeholder="Exercise Name"
            required
            className="input input-bordered w-full text-center"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="description">
            <span className="label-text  mx-auto font-bold">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={exercise.description}
            onChange={handleChange}
            placeholder="Description"
            required
            minLength={10}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-2  place-items-center gap-3">
          <div className="form-control col-span-full">
            <label className="label" htmlFor="duration">
              <span className="label-text  mx-auto font-bold">
                Duration (minutes)
              </span>
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={exercise.duration}
              onChange={handleChange}
              placeholder="Duration"
              required
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
              placeholder="Sets"
              required
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
              placeholder="Reps"
              required
              min={0}
              className="input input-bordered w-full text-center"
            />
          </div>
        </div>


        <div className="form-control py-4">
          <label className="label" htmlFor="media">
            <span className="label-text mx-auto font-bold">Exercise's Youtube Link</span>
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={exercise.media}
            onChange={handleChange}
            placeholder="https://youtu.be/example"
            className="input input-bordered w-full text-center"
          />
        </div>

        <div className="form-control">
          <button
            type="submit"
            className="btn btn-success text-white font-Acme text-2xl"
          >
            Create Exercise
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
