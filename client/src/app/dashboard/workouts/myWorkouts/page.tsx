"use client";

import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import WorkoutCard from "@/components/ui/cards/workoutCard";
import Pagination from "@/components/ui/pagination/pagination";
import { UseWorkoutsByUserIdQuery } from "@/lib/queries";
import useUserStore from "@/store/userStore";
import { WorkoutProps } from "@/types/workout";
import Link from "next/dist/client/link";
import React, { useState } from "react";

export default function UserWorkouts({ operation }: { operation: string }) {
  const { user } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  const { data } = UseWorkoutsByUserIdQuery(
    user?.id as string,
    currentPage,
    limit
  );

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentPath = `/workouts/My Workouts`;

  return (
    <div className="container mx-auto p-4 min-h-screen py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>
      <div className="text-center">
        <h1 className="text-6xl drop-shadow-lg cursor-default font-bold font-Acme text-center text-slate-100">
          {renderButton(operation)}
        </h1>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30 mt-5" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 min-h-screen py-10">
        {data?.workouts[0] ? (
          data.workouts.map((workout: WorkoutProps) => (
            <WorkoutCard key={workout.id} workout={workout} operation="view" />
          ))
        ) : (
          <div className="grid place-items-center">
            {" "}
            <h2 className="text-6xl font-bold "> No Workouts</h2>
            <div className="flex md:flex-row flex-col mt-10 items-center justify-center gap-3 text-center">
              <Link
                href={"/workouts"}
                className="text-3xl font-bold hover:text-black"
              >
                {" "}
                Add Workouts
              </Link>
              <span className="text-3xl font-bold text-black">OR</span>
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

      {data && data.workouts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.total || 0) / limit)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
