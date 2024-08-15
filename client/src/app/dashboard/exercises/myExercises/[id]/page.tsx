import ExerciseCard from "@/components/ui/cards/exerciseCard";
import { fetchExerciseById } from "@/lib/exercsie";
import { PropsParams } from "@/types/params";
import React from "react";

export default async function ExerciseById(props: PropsParams) {
  const { id } = props.params;

  const exercise = await fetchExerciseById(id);

  return (
    <div className="container  min-h-screen  flex flex-col items-center">
      <h1 className="text-2xl items-start font-bold mt-10">{exercise.name}</h1>

      <ExerciseCard exercise={exercise} operation="user" />
    </div>
  );
}
