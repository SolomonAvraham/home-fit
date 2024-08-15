"use client";

import React, { useState } from "react";
import { UseExercisesByUserIdQuery } from "@/lib/queries";
import ExerciseCard from "@/components/ui/cards/exerciseCard";
import Pagination from "@/components/ui/pagination/pagination";
import useUserStore from "@/store/userStore";
import Link from "next/link";

const UserExercises = () => {
  const { user } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data } = UseExercisesByUserIdQuery(
    user?.id as string,
    currentPage,
    limit
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">My Exercises</h1>
      <div className="flex flex-wrap items-center justify-center gap-4 min-h-screen">
        {data?.exercises.length ? (
          data.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              operation="user"
            />
          ))
        ) : (
          <div className="grid place-items-center">
            {" "}
            <h2 className="text-6xl font-bold">No Exercises</h2>
            <div className="flex items-center justify-center gap-3">
              <Link
                href={"/dashboard/exercises"}
                className="text-3xl font-bold hover:text-black"
              >
                Add Exercise
              </Link>
              <span className="text-3xl font-bold">OR</span>
              <Link
                href={"/dashboard/exercises/create"}
                className="text-3xl font-bold hover:text-black"
              >
                {" "}
                Create Exercise
              </Link>
            </div>
          </div>
        )}
      </div>
      {data && data.exercises.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.total || 0) / limit)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserExercises;
