"use client";

import React from "react";
import { UseAllWorkoutsQuery } from "@/lib/queries";
import WorkoutCard from "@/components/ui/cards/workoutCard";

const Workouts = () => {
  const { data } = UseAllWorkoutsQuery();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">Workouts</h1>

      <div className="flex flex-wrap items-center justify-center  gap-4">
        {data?.map((workout: any) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            operation="viewUnsigned"
          />
        ))}
      </div>
    </div>
  );
};

export default Workouts;
