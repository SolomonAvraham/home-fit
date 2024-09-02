"use client";

import React, { useState } from "react";
import { UseAllWorkoutsQuery } from "@/lib/queries";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import Pagination from "@/components/ui/pagination/pagination";
const Workouts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data } = UseAllWorkoutsQuery(currentPage, limit);

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen py-10">
      <div className="text-center">
        <h1 className="text-6xl drop-shadow-lg cursor-default font-bold font-Acme text-center text-slate-100">
          Workout
        </h1>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30 mt-3" />
        <h2 className="text-sm font-bold font-Acme text-center text-slate-600 py-1">
          Discover diverse workout routines to inspire your fitness journey and
          challenge yourself with new exercises. top of your fitness goals.
        </h2>{" "}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4  py-5">
        {data?.workouts[0] ? (
          data.workouts.map((workout: any) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              operation="viewUnsigned"
            />
          ))
        ) : (
          <h2 className="text-6xl font-bold ">No Workouts</h2>
        )}
      </div>

      {data?.workouts[0] && data?.workouts.length > 0 && (
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
