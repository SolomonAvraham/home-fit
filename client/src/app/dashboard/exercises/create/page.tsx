import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import ExerciseForm from "@/components/ui/forms/exercise/exerciseForm";
import React from "react";

export default function CreateExercise() {
  const currentPath = `/dashboard/exercises/Create Exercise`;
  

  return (
    <div className="container  min-h-screen  mx-auto py-10">
      <div className=" -mt-10">
        <Breadcrumb currentPath={currentPath} excludePaths={[]} />
      </div>{" "}
      <div className="py-5 px-5 grid place-items-center ">
        <ExerciseForm workoutId="" />
      </div>
    </div>
  );
}
