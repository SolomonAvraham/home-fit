import {
  User,
  Workout,
  Exercise,
  Workout_exercises,
  ScheduledWorkout,
} from "../../models";

export type UserAssociate = {
  Workout: typeof Workout;
  Exercise: typeof Exercise;
  ScheduledWorkout: typeof ScheduledWorkout;
};

export type WorkoutAssociate = {
  User: typeof User;
  Exercise: typeof Exercise;
  Workout_exercises: typeof Workout_exercises;
  ScheduledWorkout: typeof ScheduledWorkout;
};

export type ExerciseAssociate = {
  User: typeof User;
  Workout: typeof Workout;
  Workout_exercises: typeof Workout_exercises;
};

export type WorkoutExercisesAssociate = {
  Workout: typeof Workout;
  Exercise: typeof Exercise;
};

export type ScheduledWorkoutAssociate = {
  Workout: typeof Workout;
  User: typeof User;
};

export type ExerciseAttributes = {
  id: string;
  name: string;
  description: string;
  duration?: number;
  sets?: number;
  reps?: number;
  media?: string;
  userId: string;
  workoutId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutAttributes = {
  id: string;
  name: string;
  description: string;
  duration?: string;
  userId: string;
  user?: User;
  exercises?: Exercise[];
  createdBy: {
    creatorId: string;
    creatorName: string;
    originalWorkoutId?: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserAttributes = {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ScheduledWorkoutAttributes = {
  id: string;
  userId: string;
  workoutId: string;
  scheduledDate: Date;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};
