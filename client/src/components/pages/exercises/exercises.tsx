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
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">Exercises</h1>

      <div className="flex flex-wrap items-center justify-center gap-4 min-h-screen">
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
