"use client";

import React, { useState } from "react";
import { UseAllWorkoutsQuery } from "@/lib/queries";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import Pagination from "@/components/ui/pagination/pagination";
const Workouts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data } = UseAllWorkoutsQuery(currentPage, limit);
  console.log("🚀 ~ Workouts ~ data:", data.workouts.length);

  const totalPages = Math.ceil((data?.total as number) / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">Workouts</h1>

      <div className="flex flex-wrap items-center justify-center gap-4 min-h-screen">
        {data?.workouts[0] ? (
          data.workouts.map((workout: any) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              operation="viewUnsigned"
            />
          ))
        ) : (
          <h2 className="text-6xl font-bold "> No Workouts</h2>
        )}
      </div>

      {data.workouts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Workouts;
