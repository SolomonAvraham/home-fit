"use client";

import React, { useState } from "react";
import { UseExercisesByUserIdQuery } from "@/lib/queries";
import ExerciseCard from "@/components/ui/cards/exerciseCard";
import Pagination from "@/components/ui/pagination/pagination";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";

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

  const currentPath = `/dashboard/exercises/My Exercises`;

  return (
    <div className="container mx-auto p-4 min-h-screen py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>
      <div className="text-center">
        <h1 className="text-6xl drop-shadow-lg cursor-default font-bold font-Acme text-center text-slate-100">
          My Exercises{" "}
        </h1>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30 mt-5" />
      </div>

      
      <div className="flex flex-wrap items-center justify-center gap-4 min-h-screen py-10">
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
            <div className="flex md:flex-row flex-col mt-10 items-center justify-center gap-3 text-center">
              <Link
                href={"/dashboard/exercises"}
                className="text-3xl font-bold hover:text-black"
              >
                Add Exercise
              </Link>
              <span className="text-3xl font-bold text-black">OR</span>
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
