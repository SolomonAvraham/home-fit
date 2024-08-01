"use client";

import React from "react";

const userId =
  typeof window !== "undefined" ? localStorage.getItem("userId") : "";

export default function MyExercises() {
  //const { data } = UseExercisesByUserIdQuery(userId || "");

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold">My Exercises</h1>
    </div>
  );
}
