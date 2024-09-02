import React from "react";
import { FaUserCircle } from "react-icons/fa";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    experience:
      "I've been focusing on HIIT workouts and intermittent fasting for six months. Lost 15 lbs, increased stamina, and can run a 5K non-stop. The community support has been invaluable.",
    workouts: [
      {
        id: 1,
        title: "Morning Cardio Blast",
        exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers"],
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    experience:
      "Committed to strength training, gained 10 lbs of muscle. It’s been life-changing, boosting my confidence and building friendships. I love sharing progress and learning new exercises.",
    workouts: [
      {
        id: 2,
        title: "Strength Training Routine",
        exercises: ["Squats", "Deadlifts", "Bench Press"],
      },
    ],
  },
  {
    id: 3,
    name: "Alice Johnson",
    experience:
      "Yoga has improved my flexibility and reduced chronic back pain. This community inspires me, and I now host virtual yoga sessions. I’m motivated by the progress shared here.",
    workouts: [
      {
        id: 3,
        title: "Yoga Flow",
        exercises: ["Downward Dog", "Warrior II", "Tree Pose"],
      },
    ],
  },
  {
    id: 4,
    name: "Mary Smith",
    experience:
      "Strength training helped me gain 10 lbs of muscle, transforming me physically and mentally. I've built confidence and friendships, and love learning new exercises.",
    workouts: [
      {
        id: 2,
        title: "Strength Training Routine",
        exercises: ["Squats", "Deadlifts", "Bench Press"],
      },
    ],
  },
];

export default function Community() {
  return (
    <div className="min-h-screen  p-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl drop-shadow-lg cursor-default font-bold font-Acme text-center text-slate-100">
          Community{" "}
        </h1>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30" />
        <h2 className="text-sm font-bold font-Acme text-center text-slate-600 py-1">
          Connect with like-minded fitness enthusiasts, share your progress, and
          find motivation within our supportive community
        </h2>{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {dummyUsers.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700"
          >
            <div className="text-center">
              <h2 className="text-4xl mb-2 font-bold font-Acme text-white">
                {user.name}
              </h2> 
              <div className="p-1 float-start">
                <FaUserCircle className="text-8xl text-gray-500 rounded-full shadow-gray-700 shadow-2xl sha" />
              </div>
              <p className="text-gray-400">{user.experience}</p>
            </div>

            {/* <h3 className="text-lg font-bold text-white mb-2">
              Shared Workouts:
            </h3> */}
            {user.workouts.map((workout) => (
              <div key={workout.id} className="py-4">
                <h4 className="text-2xl font-bold font-Acme text-gray-300">
                  {workout.title}
                </h4>
                <ul className="list-disc pl-5 text-gray-400">
                  {workout.exercises.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
