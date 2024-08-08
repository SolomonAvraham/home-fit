"use client";

import { login, logout, register } from "@/services/authService";
import { createExercise } from "@/services/exerciseService";
import {
  addWorkout,
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkoutsByUserId,
  isWorkoutExist,
  updateWorkout,
} from "@/services/workoutService";
import useErrorsStore from "@/store/ErrorsStore";
import useUserStore from "@/store/userStore";
import {
  APIError,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";
import { ExerciseAttributes } from "@/types/exercise";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function UseAllWorkoutsQuery() {
  return useQuery({
    queryKey: ["get all workouts"],
    queryFn: async () => {
      return await getWorkouts();
    },
    staleTime: Infinity,
  });
}

export function UseWorkoutsByUserIdQuery(userId: string) {
  return useQuery({
    queryKey: ["workouts by user id"],
    queryFn: async () => {
      return await getWorkoutsByUserId(userId);
    },

    enabled: !!userId,
  });
}

export function UseLogoutMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      router.refresh();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
}

export function UseLoginMutation(
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const router = useRouter();
  const { setUser } = useUserStore();

  return useMutation<User, APIError, LoginCredentials>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      setUser(data);

      router.push("/dashboard");
    },
    onError: (error: APIError) => {
      console.log("error:", error);
      setError(error.message);
    },
  });
}

export function UseRegisterMutation(
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const router = useRouter();

  return useMutation<User, APIError, RegisterCredentials>({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (error) => {
      setError(error.message);
    },
  });
}

export function UseDeleteWorkoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete Workout"],
    mutationFn: deleteWorkout,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
}

export function UseCreateWorkoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create Workout"],
    mutationFn: createWorkout,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      router.push(`/dashboard/workouts/addExercise/${data.id}`);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
}

export function UseUpdateWorkoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create Workout"],
    mutationFn: updateWorkout,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      router.push(`/dashboard/workouts/myWorkouts/${data.id}`);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
}

export function UseCreateExerciseMutation(
  formRef: React.RefObject<HTMLFormElement> | null,
  setExercise: React.Dispatch<React.SetStateAction<ExerciseAttributes>>,
  workoutId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create Exercise"],
    mutationFn: createExercise,
    onSuccess: (data) => {
      if (!formRef?.current) throw new Error("Form not found");
      formRef.current?.reset();

      setExercise({
        name: "",
        description: "",
        duration: 0,
        sets: 0,
        reps: 0,
        media: "",
        workoutId,
        userId: "",
      });

      queryClient.invalidateQueries();
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
}

export function UseAddWorkoutMutation() {
  const queryClient = useQueryClient();
  const { setErrorAlert } = useErrorsStore();

  return useMutation({
    mutationKey: ["add Workout"],
    mutationFn: addWorkout,
    onSuccess: (data) => {
      console.log("addWorkout data", data);
      queryClient.invalidateQueries({ queryKey: ["isWorkoutExist"] });
    },
    onError: (error: any) => {
      setErrorAlert(error.response.data.message);
    },
  });
}

export function UseIsWorkoutExistQuery(workoutId: string, userId: string) {
  return useQuery({
    queryKey: ["isWorkoutExist", workoutId, userId],
    queryFn: async () => {
      return await isWorkoutExist(workoutId, userId);
    },
    enabled: !!workoutId && !!userId,
  });
}
