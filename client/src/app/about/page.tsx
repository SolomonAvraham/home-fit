"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function About() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl  bg-gray-800 text-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center  font-Acme mt-6">
          About Our HomeFit App
        </h1>
        <hr className="border-gray-700 w-2/4 mx-auto opacity-30 mb-6 py-1" />
        <p className="text-base font-extralight mb-4">
          Welcome to our HomeFit, a platform designed to bring personalized
          fitness plans and community engagement right to your fingertips.
          Whether you're just starting your fitness journey or are a seasoned
          athlete, our app provides the tools and resources you need to stay on
          track and achieve your goals.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-Acme font-semibold text-blue-500 mb-2">
            Workouts and Exercises
          </h2>
          <p className="text-base text-black font-light mb-4">
            Our app offers a wide range of workouts tailored to different
            fitness levels and goals. From strength training and cardio to yoga
            and flexibility routines, you'll find workouts designed by top
            trainers to keep you motivated and challenged.
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-Acme font-semibold text-green-500 mb-2">
            Sharing Workouts and Exercises
          </h2>
          <p className="text-base text-black font-light mb-4">
            One of the unique features of our app is the ability to share
            workouts and exercises with other users. You can browse through
            workouts shared by other users, add them to your own workout plans,
            or even modify them to better suit your personal needs. This feature
            fosters a sense of community and encourages everyone to learn from
            each other.
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-Acme font-semibold text-yellow-500 mb-2">
            Building a Fitness Community
          </h2>
          <p className="text-base text-black font-light mb-4">
            We believe that fitness is more than just working out; it's about
            building a community of like-minded individuals who support and
            motivate each other. Our app's social features allow you to connect
            with friends, share your progress, and even participate in
            challenges together.
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-Acme font-semibold text-purple-500 mb-2">
            Get Started Today
          </h2>
          <p className="text-base text-black font-light mb-4">
            Join our community today and start your journey towards a healthier
            and more active lifestyle. Download the app, create your profile,
            and explore the world of workouts and exercises waiting for you.
          </p>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/auth/register")}
            className="btn btn-md btn-outline text-3xl bg-gray-200 font-Acme"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
