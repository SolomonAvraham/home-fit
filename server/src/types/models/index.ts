import {
  User,
  Workout,
  Progress,
  Notification,
  Exercise,
  Workout_exercises,
} from "../../models";

export type UserAssociate = {
  Progress: typeof Progress;
  Workout: typeof Workout;
  Notification: typeof Notification;
};

export type WorkoutAssociate = {
  User: typeof User;
  Exercise: typeof Exercise;
  Notification: typeof Notification;
  Workout_exercises: typeof Workout_exercises;
};

export type ExerciseAssociate = {
  Workout: typeof Workout;
  Workout_exercises: typeof Workout_exercises;
};

export type ProgressAssociate = {
  Workout: typeof Workout;
  User: typeof User;
};

export type NotificationAssociate = {
  User: typeof User;
};

export type WorkoutExercisesAssociate = {
  Workout: typeof Workout;
  Exercise: typeof Exercise;
};

export type ExerciseAttributes = {
  id?: string;
  name: string;
  description: string;
  duration?: string;
  sets: string;
  reps: string;
  media?: string;
  createdAt: Date;
  updatedAt?: Date;
  workoutId: string;
};
