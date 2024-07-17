"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ExerciseAttributes } from "@/types/exercise";



export default function WorkoutCard({ workout }: any) {
  const router = useRouter();

  const [showDetails, setShowDetails] = useState(false);

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const getWorkout = (id: string) => {
    return router.push(`/workouts/${id}`);
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4">
      <button
        onClick={() => getWorkout(workout.id)}
        className=" cursor-pointer bg-gray-500 p-3 w-1/2 mx-auto  rounded-xl text-center mt-10 text-xl text-white"
      >
        WORKOUT
      </button>
      <div className="card-body">
        <h2 className="card-title">{workout.name}</h2>
        <p>Date: {format(new Date(workout.date), "MMMM d, yyyy")}</p>
        <p>Duration: {workout.duration} minutes</p>
        <p>Created by: {workout.userName}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn btn-primary"
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4">
            <p className="text-sm">{workout.description}</p>
            <h3 className="font-bold mt-4 mb-2">Exercises:</h3>
            <ul className="space-y-4">
              {workout.exercises.map(
                (exercise: ExerciseAttributes, index: number) => (
                  <li key={index} className="border-b pb-2">
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p>{exercise.description}</p>
                    <p>
                      {exercise.sets} sets,{" "}
                      {exercise.reps
                        ? `${exercise.reps} reps`
                        : exercise.duration}
                    </p>
                    {exercise.media && getYoutubeEmbedUrl(exercise.media) && (
                      <div className="mt-2">
                        {" "}
                        <iframe
                          width="100%"
                          height="200"
                          src={getYoutubeEmbedUrl(exercise.media) || ""}
                          title={`YouTube video player for ${exercise.name}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
