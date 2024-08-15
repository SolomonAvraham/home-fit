"use client";

import { login, logout, register } from "@/services/authService";
import {
  addExerciseToWorkout,
  createExercise,
  deleteExercise,
  getAllExercises,
  getExercisesByUserId,
  isExerciseInWorkout,
  updateExercise,
} from "@/services/exerciseService";
import {
  addWorkout,
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkoutsByUserId,
  isWorkoutExist,
  updateWorkout,
} from "@/services/workoutService";
import useAlertStore from "@/store/alertStore";
import useUserStore from "@/store/userStore";
import {
  APIError,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";
import { ExerciseAttributes } from "@/types/exercise";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

//////USER QUERIES//////

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

//////WORKOUTS QUERIES//////

export function UseAllWorkoutsQuery(page: number, limit: number) {
  return useQuery({
    queryKey: ["get all workouts", page, limit],
    queryFn: async () => {
      return await getWorkouts(page, limit);
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}

export function UseWorkoutsByUserIdQuery(
  userId: string,
  page: number,
  limit: number
) {
  return useQuery({
    queryKey: ["get workouts by user id", userId, page, limit],
    queryFn: async () => await getWorkoutsByUserId(userId, page, limit),
    staleTime: Infinity,
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
}
export function UseDeleteWorkoutMutation() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["delete Workout"],
    mutationFn: deleteWorkout,
    onSuccess: () => {
      setAlert("Deleted Successfully");
      queryClient.invalidateQueries();
      router.push(`/dashboard/workouts/myWorkouts`);
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

export function UseAddWorkoutMutation() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();

  return useMutation({
    mutationKey: ["add Workout"],
    mutationFn: addWorkout,
    onSuccess: () => {
      setAlert("Added Successfully");
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      setAlert(error.response.data.message);
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

//////EXERCISES QUERIES//////

export function UseCreateExerciseMutation(
  formRef: React.RefObject<HTMLFormElement> | null,
  setExercise: React.Dispatch<React.SetStateAction<ExerciseAttributes>>
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAlert } = useAlertStore();

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
        userId: "",
      });

      queryClient.invalidateQueries();

      if (data.workoutId) {
        alert("Exercise added successfully to the workout!");
      } else {
        router.push(`/dashboard/exercises/myExercises/${data.id}`);
      }
    },
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response?.data.message);
    },
  });
}

export function UseAllExercisesQuery(page: number, limit: number) {
  return useQuery({
    queryKey: ["get all exercises", page, limit],
    queryFn: async () => {
      return await getAllExercises(page, limit);
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}

export function UseExercisesByUserIdQuery(
  userId: string,
  page: number,
  limit: number
) {
  return useQuery({
    queryKey: ["get exercises by user id", userId, page, limit],
    queryFn: async () => await getExercisesByUserId(userId, page, limit),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
}

export function UseDeleteExerciseMutation() {
  const { setAlert } = useAlertStore();
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete exercise"],
    mutationFn: deleteExercise,
    onSuccess: () => {
      setAlert("Deleted Successfully");
      queryClient.invalidateQueries();
      router.push(`/dashboard/exercises/myExercises`);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
}

export function UseUpdateExerciseMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAlert } = useAlertStore();

  return useMutation({
    mutationKey: ["update exercise"],
    mutationFn: updateExercise,
    onSuccess: (data) => {
      setAlert("Updated Successfully");
      router.push(`/dashboard/exercises/myExercises/${data.id}`);
      queryClient.invalidateQueries();
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
}

export function UseAddExerciseToWorkoutMutation() {
  const { setAlert } = useAlertStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add exercise to workout"],
    mutationFn: addExerciseToWorkout,
    onSuccess: () => {
      setAlert("Added Successfully");
      queryClient.invalidateQueries();
    },
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response?.data.message);
    },
  });
}

export function UseIsExerciseInWorkoutQuery(
  data: {
    exerciseId: string;
    userId: string;
  },
  enabled: boolean
) {
  return useQuery({
    queryKey: ["is Exercise In Workout"],
    queryFn: async () => await isExerciseInWorkout(data),
    enabled,
  });
}
