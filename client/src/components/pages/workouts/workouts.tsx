"use client";

import React from "react";
import { UseWorkoutQuery } from "@/lib/queries";
import WorkoutCard from "@/components/ui/cards/workoutCard";

const Workouts = () => {
  const { data } = UseWorkoutQuery();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">Workouts</h1>

      <div className="flex flex-wrap gap-4">
        {data?.map((workout: any) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default Workouts;
