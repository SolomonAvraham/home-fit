export type ExerciseAttributes = {
  id?: string;
  name: string;
  description: string;
  duration?: number;
  sets?: number;
  reps?: number;
  media?: string;
  userId: string;
  workoutId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
