import { validate as isValidUUID } from "uuid";
import { Exercise, User, Workout, Workout_exercises } from "../models/index";
import { ExerciseAttributes } from "../types/models";
import { v4 as uuidv4 } from "uuid";
import formatMinutesToHours from "../utils/formatMinutesToHours";

class ExerciseService {
  static async isExerciseInWorkout(data: {
    exerciseId: string;
    userId: string;
  }): Promise<
    | {
        id: string;
        name: string;
      }[]
    | false
  > {
    try {
      const { exerciseId, userId } = data;

      const exercise = await Exercise.findByPk(exerciseId);

      if (!exercise) {
        throw new Error("Exercise not found");
      }

      const workouts = await Workout.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: Exercise,
            as: "exercises",
            through: { attributes: [] },
            attributes: ["id", "name"],
          },
        ],
      });

      if (!workouts) {
        throw new Error("Workouts not found");
      }

      const excludedWorkouts = workouts
        .filter(
          (workout) =>
            !workout.exercises?.some((ex: Exercise) => ex.id === exerciseId)
        )
        .map((workout) => {
          return {
            id: workout.id,
            name: workout.name,
          };
        });

      if (!excludedWorkouts[0]) {
        return false;
      }

      return excludedWorkouts;
    } catch (error) {
      console.error("Check Exercise Existence Error:", error);
      throw new Error("Failed to check exercise existence");
    }
  }

  static async addExerciseToWorkout(data: {
    exerciseId: string;
    workoutId: string;
  }) {
    const { exerciseId, workoutId } = data;

    try {
      const exercise = await Exercise.findByPk(exerciseId);

      if (!exercise) {
        throw new Error("Exercise not found");
      }

      const workout = await Workout.findByPk(workoutId);

      if (!workout) {
        throw new Error("Workout not found");
      }

      const existingEntry = await Workout_exercises.findOne({
        where: {
          exerciseId,
          workoutId,
        },
      });

      if (existingEntry) {
        throw new Error("Exercise already added to this workout");
      }

      const addExercise = await Workout_exercises.create({
        workoutId,
        exerciseId: exercise.id,
      });

      return addExercise;
    } catch (error: any) {
      console.error("Add Exercise to Workout Service Error:", error);
      throw new Error(error.message);
    }
  }

  static async createExercise(exercise: ExerciseAttributes) {
    try {
      const id = uuidv4();

      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }

      const getYoutubeEmbedUrl = (url: string) => {
        const regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11
          ? `https://www.youtube.com/embed/${match[2]}`
          : null;
      };

      if (exercise.media && !getYoutubeEmbedUrl(exercise.media)) {
        throw new Error("Invalid YouTube URL");
      }

      const newExercise = await Exercise.create({
        ...exercise,
        media: getYoutubeEmbedUrl(exercise.media as string) as string,
        id,
        createdBy: [
          {
            creatorName: exercise.createdBy?.[0].creatorName as string,
            creatorId: exercise.userId,
            originalExerciseId: id,
          },
        ],
      });

      if (!newExercise) {
        throw new Error("Failed to create exercise");
      }

      if (exercise.workoutId) {
        await Workout_exercises.create({
          workoutId: exercise.workoutId,
          exerciseId: newExercise.id,
        });
      }

      return newExercise;
    } catch (error: any) {
      console.error("Create Exercise Service Error:", error);
      throw new Error(error.message as string);
    }
  }

  static async getAllExercises(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;

      const { rows: exercises, count } = await Exercise.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      return {
        total: count,
        page,
        limit,
        exercises,
      };
    } catch (error) {
      console.error("Get All Exercises Service Error:", error);
      throw new Error("Failed to fetch exercises");
    }
  }

  static async getExercisesByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const offset = (page - 1) * limit;

      const { rows: exercises, count } = await Exercise.findAndCountAll({
        where: { userId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      const formattedExercises = exercises.map((exercise) => {
        const exerciseJSON = exercise.toJSON() as ExerciseAttributes;

        const formattedTime = exerciseJSON.duration
          ? formatMinutesToHours(exerciseJSON.duration)
          : undefined;

        return {
          id: exerciseJSON.id,
          name: exerciseJSON.name,
          description: exerciseJSON.description,
          duration: formattedTime,
          sets: exerciseJSON.sets,
          reps: exerciseJSON.reps,
          media: exerciseJSON.media,
          userId: exerciseJSON.userId,
          createdBy: exerciseJSON.createdBy?.map((creator) => ({
            creatorId: creator.creatorId,
            creatorName: creator.creatorName,
            originalExerciseId: creator.originalExerciseId,
          })),
          createdAt: exerciseJSON.createdAt,
          updatedAt: exerciseJSON.updatedAt,
        };
      });

      return {
        total: count,
        page,
        limit,
        exercises: formattedExercises,
      };
    } catch (error) {
      console.error("Get Exercises By User ID Service Error:", error);
      throw new Error("Failed to fetch exercises");
    }
  }

  static async getExerciseById(id: string) {
    try {
      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const exercise = await Exercise.findByPk(id);
      if (!exercise) {
        throw new Error("Exercise not found");
      }
      return exercise;
    } catch (error) {
      console.error("Get Exercise By ID Service Error:", error);
      throw new Error("Failed to fetch exercise");
    }
  }

  static async updateExercise(id: string, data: any) {
    try {
      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const exercise = await Exercise.findByPk(id);
      if (!exercise) {
        throw new Error("Exercise not found");
      }
      const updatedExercise = await exercise.update(data);
      return updatedExercise;
    } catch (error) {
      console.error("Update Exercise Service Error:", error);
      throw new Error("Failed to update exercise");
    }
  }

  static async deleteExercise(id: string) {
    try {
      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const exercise = await Exercise.findByPk(id);
      if (!exercise) {
        throw new Error("Exercise not found");
      }
      await exercise.destroy();
      return exercise;
    } catch (error) {
      console.error("Delete Exercise Service Error:", error);
      throw new Error("Failed to delete exercise");
    }
  }
}

export default ExerciseService;
