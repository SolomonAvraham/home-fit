"use client";

import WorkoutCard from "@/components/ui/cards/workoutCard";
import { UseWorkoutsByUserIdQuery } from "@/lib/queries";
import { WorkoutProps } from "@/types/workout";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from "react";

export default function MyWorkouts({ operation }: { operation: string }) {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId") || "";
      setUserId(userId);
    }
  }, []);

  const { data, isLoading } = UseWorkoutsByUserIdQuery(userId);

  const renderButton = (operation: string) => {
    switch (operation) {
      case "edit":
        return "Edit Workout";
      case "delete":
        return "Delete Workout";
      default:
        return "My Workouts";
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">{renderButton(operation)}</h1>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {data && data.length ? (
          data.map((workout: WorkoutProps) => (
            <WorkoutCard key={workout.id} workout={workout} operation="view" />
          ))
        ) : (
          <div className="text-center ">
            {" "}
            <h2 className="text-6xl font-bold "> No Workouts</h2>
            <div className="flex items-center justify-center gap-3">
              <Link
                href={"/workouts"}
                className="text-3xl font-bold hover:text-black"
              >
                {" "}
                Add Workouts
              </Link>
              <span className="text-3xl font-bold">OR</span>
              <Link
                href={"/dashboard/workouts/create"}
                className="text-3xl font-bold hover:text-black"
              >
                {" "}
                Create Workouts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
