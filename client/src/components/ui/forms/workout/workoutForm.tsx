"use client";

import { UseCreateWorkoutMutation } from "@/lib/queries";
import useUserStore from "@/store/userStore";
import { useEffect, useState } from "react";

const WorkoutForm = () => {
  const { user } = useUserStore();

  const [workout, setWorkout] = useState({
    userId: "",
    duration: 0,
    description: "",
    name: "",
    createdBy: [{ creatorId: "", creatorName: "", originalWorkoutId: "" }],
  });

  useEffect(() => {
    if (user) {
      setWorkout({
        ...workout,
        userId: user.id,
        createdBy: [
          {
            creatorId: user.id,
            creatorName: user.name,
            originalWorkoutId: "",
          },
        ],
      });
    }
  }, [user]);

  const createWorkoutMutation = UseCreateWorkoutMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createWorkoutMutation.mutateAsync(workout);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-base-200 rounded-box shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Workout</h2>
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
            placeholder="Workout Name"
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
            placeholder="Description"
            required
            className="textarea textarea-bordered h-24"
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Create Workout
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
