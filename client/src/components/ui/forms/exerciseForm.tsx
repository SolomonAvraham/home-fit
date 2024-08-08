"use client";

import { getWorkoutByIdAction } from "@/actions/workoutActions";
import { UseCreateExerciseMutation } from "@/lib/queries";
import useUserStore from "@/store/userStore";
import { ExerciseAttributes } from "@/types/exercise";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ExerciseForm = ({ workoutId }: { workoutId: string }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUserStore();

  const [exercise, setExercise] = useState<ExerciseAttributes>({
    name: "",
    description: "",
    duration: 0,
    sets: 0,
    reps: 0,
    media: "",
    workoutId,
    userId: "",
    createdBy: [{ creatorId: "", creatorName: "", originalExerciseId: "" }],
  });

  useEffect(() => {
    if (user) {
      setExercise({
        ...exercise,
        userId: user.id,
        createdBy: [
          {
            creatorId: user.id,
            creatorName: user.name,
            originalExerciseId: "",
          },
        ],
      });
    }
  }, [user]);

  const createExerciseMutation = UseCreateExerciseMutation(
    formRef,
    setExercise,
    workoutId
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries({ ...exercise }).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    await createExerciseMutation.mutateAsync(exercise);

    await getWorkoutByIdAction(workoutId);
    router.refresh();
  };

  return (
    <div className="max-w-md   mx-auto mt-8 p-6 bg-base-200 rounded-box shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Exercise</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Exercise Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={exercise.name}
            onChange={handleChange}
            placeholder="Exercise Name"
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
            value={exercise.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="duration">
            <span className="label-text">Duration (minutes)</span>
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={exercise.duration}
            onChange={handleChange}
            placeholder="Duration"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="sets">
            <span className="label-text">Sets</span>
          </label>
          <input
            type="number"
            id="sets"
            name="sets"
            value={exercise.sets}
            onChange={handleChange}
            placeholder="Sets"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="reps">
            <span className="label-text">Reps</span>
          </label>
          <input
            type="number"
            id="reps"
            name="reps"
            value={exercise.reps}
            onChange={handleChange}
            placeholder="Reps"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="media">
            <span className="label-text">Media</span>
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={exercise.media}
            onChange={handleChange}
            placeholder="Media URL"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Create Exercise
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
