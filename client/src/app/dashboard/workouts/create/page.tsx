import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import WorkoutForm from "@/components/ui/forms/workout/workoutForm";
import React from "react";

export default function CreateWorkout() {
  const currentPath = `/workouts/Create Workout`;
  return (
    <div className="container  min-h-screen mx-auto  py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>{" "}
      <div className="py-5 grid place-items-center  ">
        <WorkoutForm />
      </div>
    </div>
  );
}
