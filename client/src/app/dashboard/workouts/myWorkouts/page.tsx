"use client";

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

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">{renderButton(operation)}</h1>

      {data?.workouts[0] ? (
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-center gap-4 min-h-screen">
            {data.workouts.map((workout: WorkoutProps) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                operation="view"
              />
            ))}
          </div>
          {data.workouts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data?.total / limit)}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      ) : (
        <div className="grid place-items-center">
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
  );
}
