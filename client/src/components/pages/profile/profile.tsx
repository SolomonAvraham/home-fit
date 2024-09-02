"use client";

import { UseDeleteUserMutation, UseUpdateUserMutation } from "@/lib/queries";
import useAlertStore from "@/store/alertStore";
import useConfirmStore from "@/store/confirmStore";
import { GetUser } from "@/types/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRunning, FaUserCircle } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";

const ProfilePage = ({ ...user }: GetUser) => {
  const router = useRouter();
  const { triggerConfirm } = useConfirmStore.getState();
  const { setAlert } = useAlertStore();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const updateUserMutation = UseUpdateUserMutation();
  const deleteUserMutation = UseDeleteUserMutation();

  const createdAt = user?.createdAt
    ? new Date(user?.createdAt).toLocaleDateString()
    : 0;
  const updatedAt = user?.updatedAt
    ? new Date(user?.updatedAt).toLocaleDateString()
    : 0;

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === user.name || email === user.email) {
      setAlert("Change Name or Email to edit", true);
      return;
    }

    const userConfirmed = await triggerConfirm(
      "Are you sure you want to Edit your profile?"
    );

    if (userConfirmed) {
      await updateUserMutation.mutateAsync({ id: user?.id, name, email });
    }
  };

  const deleteUser = async (id: string) => {
    const userConfirmed = await triggerConfirm(
      "Are you sure you want to Delete your account?"
    );

    if (userConfirmed) {
      await deleteUserMutation.mutateAsync(id);
    }
  };

  if (user === null) {
    return <h1>User not found</h1>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 gap-12 font-Acme bg-bgOne-40   bg-fixed bg-cover bg-right-bottom ">
      {/* USER INFO CARD */}
      <div className="card w-3/4 md:w-2/3 bg-gray-800  shadow-xl rounded-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white text-3xl md:text-5xl">
            Profile Details
          </h2>
          <hr className="bg-white w-full opacity-25" />
          <div className="flex gap-5 text-gray-300">
            <p>Joined at: {createdAt}</p>
            <p>Last updated: {updatedAt}</p>
          </div>
          <hr className="bg-white w-3/4 opacity-25" />

          <div className="flex items-center justify-center gap-10 flex-col-reverse md:flex-row py-10">
            <form
              onSubmit={updateUser}
              className="flex flex-col items-center justify-center gap-5 "
            >
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-full max-w-xs mt-4 text-2xl tracking-widest text-white"
              >
                EDIT
              </button>
            </form>
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                <FaUserCircle className="text-9xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXERCISES AND WORKOUTS */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-3/4 md:w-2/3 bg-gray-800  p-6 shadow-lg rounded-xl">
        <div
          className="card w-40 bg-base-100 shadow-md cursor-pointer transition transform hover:scale-105"
          onClick={() => router.push("/dashboard/workouts/myWorkouts")}
        >
          <div className="card-body items-center text-center">
            <GiWeightLiftingUp className="text-4xl text-white" />
            <h2 className="card-title text-gray-100">Workouts</h2>
            <p className="text-gray-400">{user.workoutCount}</p>
          </div>
        </div>
        <div
          className="card w-40 bg-base-100 shadow-md cursor-pointer transition transform hover:scale-105"
          onClick={() => router.push("/dashboard/exercises/myExercises")}
        >
          <div className="card-body items-center text-center">
            <FaRunning className="text-4xl text-white" />
            <h2 className="card-title text-gray-100">Exercises</h2>
            <p className="text-gray-400">{user.exercisesCount}</p>
          </div>
        </div>
      </div>

      {/* DELETE USER */}
      <div className="card w-3/4 md:w-1/3 bg-gray-800  shadow-lg rounded-xl">
        <div className="card-body items-center text-center">
          <button
            className="btn btn-error w-full max-w-xs  md:text-2xl tracking-widest text-white"
            onClick={() => deleteUser(user?.id as string)}
          >
            DELETE USER
          </button>
          <div className="avatar placeholder mt-4">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
              <FaUserCircle className="text-9xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
