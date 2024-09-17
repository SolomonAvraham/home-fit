"use client";

import { register } from "@/services/authService";
import {
  addExercise,
  addExerciseToWorkout,
  createExercise,
  deleteExercise,
  getAllExercises,
  getExercisesByUserId,
  isExerciseExist,
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
import { APIError, RegisterCredentials, User } from "@/types/auth";
import { ExerciseAttributes } from "@/types/exercise";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deleteUser, updateUser } from "@/services/userService";

//////USER QUERIES//////

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
    onError: (error: APIError) => {
      console.log(error);
      setError(error.response.data.message);
    },
  });
}

export function UseUpdateUserMutation() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["update user"],
    mutationFn: updateUser,
    onSuccess: () => {
      setAlert("Edited Successfully");
      router.refresh();
      queryClient.invalidateQueries();
    },
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response.data.message, true);
    },
  });
}

export function UseDeleteUserMutation() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["delete user"],
    mutationFn: deleteUser,
    onSuccess: () => {
      setAlert("Deleted Successfully");
      setUser(null);
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      queryClient.invalidateQueries();
      router.push(`/`);
    },
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response.data.message, true);
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
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response.data.message, true);
    },
  });
}

export function UseCreateWorkoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();

  return useMutation({
    mutationKey: ["create Workout"],
    mutationFn: createWorkout,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      router.push(`/dashboard/workouts/addExercise/${data.id}`);
    },
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response.data.message, true);
    },
  });
}

export function UseUpdateWorkoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();

  return useMutation({
    mutationKey: ["create Workout"],
    mutationFn: updateWorkout,
    onSuccess: (data) => {
      setAlert("Updated Successfully");
      queryClient.invalidateQueries();
      router.push(`/dashboard/workouts/myWorkouts/${data.id}`);
    },
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response.data.message, true);
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
    onError: (error: APIError) => {
      setAlert(error.response.data.message, true);
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
  const showCreatedBy = usePathname().includes("addExercise");

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
      router.refresh();

      if (showCreatedBy || data.workoutId) {
        setAlert("Added successfully");
      }

      if (!showCreatedBy) {
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
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
}

export function UseDeleteExerciseMutation() {
  const { setAlert } = useAlertStore();
  const router = useRouter();
  const pathName = usePathname().includes("workouts/edit");
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete exercise"],
    mutationFn: deleteExercise,
    onSuccess: () => {
      setAlert("Deleted Successfully");
      queryClient.invalidateQueries();

      if (!pathName) {
        router.push(`/dashboard/exercises/myExercises`);
      }
    },
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response.data.message, true);
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
    onError: (error: APIError) => {
      console.log(error);
      setAlert(error.response.data.message, true);
    },
  });
}

export function UseAddExerciseMutation() {
  const { setAlert } = useAlertStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add exercise"],
    mutationFn: addExercise,
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

export function UseIsExerciseExistQuery(exerciseId: string, userId: string) {
  return useQuery({
    queryKey: ["is Exercise Exist", exerciseId, userId],
    queryFn: async () => {
      return await isExerciseExist({ exerciseId, userId });
    },
    enabled: !!exerciseId && !!userId,
  });
}
