"use client";

import React, { useState } from "react";
import { UseAllExercisesQuery } from "@/lib/queries";
import Pagination from "@/components/ui/pagination/pagination";
import ExerciseCard from "@/components/ui/cards/exerciseCard";

const Exercises = ({ operation }: { operation: string | null }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data } = UseAllExercisesQuery(currentPage, limit);

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen py-10">

      
      <div className="text-center">
     
        <h1 className="text-6xl drop-shadow-lg cursor-default font-bold font-Acme text-center text-slate-100">
          Exercises
        </h1>

        <hr className="border-gray-700 w-2/4 mx-auto opacity-30 mt-2" />
        <h2 className="text-sm font-bold font-Acme text-center text-slate-600 py-1">
          Manage and track your workouts with personalized exercises to stay on
          top of your fitness goals.
        </h2>{" "}
      </div>


      <div className="flex flex-wrap items-center justify-center gap-4 min-h-screen py-10">
        {data?.exercises.length ? (
          data.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              operation={operation}
            />
          ))
        ) : (
          <h2 className="text-6xl font-bold">No Exercises</h2>
        )}
      </div>

      {data && data.exercises.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Exercises;
