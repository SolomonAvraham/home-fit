import { ExerciseAttributes } from "./exercise";



export type WorkoutProps = {
  name?: string;
  duration?: number;
  userName?: string;
  description?: string;
  exercises?: [ExerciseAttributes];
  id?: string;
  createdBy?: {
    creatorId: string;
    creatorName: string;
    originalWorkoutId?: string;
  }[];
};


