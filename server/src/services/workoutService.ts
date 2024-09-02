import { Workout_exercises, Exercise, User, Workout } from "../models/index";
import { v4 as uuidv4 } from "uuid";
import { validate as isValidUUID } from "uuid";
import { ExerciseAttributes, WorkoutAttributes } from "../types/models";
import formatMinutesToHours from "../utils/formatMinutesToHours";
import { CreatedByType } from "../types/services/index";
import { Op } from "sequelize";

class WorkoutService {
  async isWorkoutExist(workoutId: string, userId: string): Promise<boolean> {
    try {
      const workout = await Workout.findByPk(workoutId);

      if (!workout) {
        throw new Error("Workout not found");
      }

      const originalWorkoutId =
        workout.createdBy?.[0]?.originalWorkoutId || workoutId;

      const existingEntry = await Workout.findOne({
        where: {
          userId: userId,
          createdBy: {
            [Op.contains]: [{ originalWorkoutId: originalWorkoutId }],
          },
        },
      });

      return !!existingEntry;
    } catch (error) {
      console.error("Check Workout Existence Error:", error);
      throw new Error("Failed to check workout existence");
    }
  }

  async addWorkout(workoutId: string, userId: string) {
    try {
      const workout = await Workout.findByPk(workoutId, {
        include: [
          {
            model: Exercise,
            as: "exercises",
            through: { attributes: [] },
            attributes: [
              "id",
              "name",
              "sets",
              "reps",
              "duration",
              "description",
              "media",
              "createdBy",
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      if (!workout) {
        throw new Error("Workout not found");
      }

      const originalWorkoutId =
        workout.createdBy?.[0]?.originalWorkoutId || workoutId;

      const existingEntry = await Workout.findOne({
        where: {
          userId: userId,
          createdBy: {
            [Op.contains]: [{ originalWorkoutId: originalWorkoutId }],
          },
        },
      });

      if (existingEntry) {
        throw new Error("Workout already added to your workouts");
      }

      const newWorkout = await Workout.create({
        ...workout.toJSON(),
        id: uuidv4(),
        userId,
        createdBy: workout.createdBy,
      });

      const checkExercise = await Workout_exercises.findOne({
        where: { workoutId },
      });

      const exercises = workout.toJSON().exercises;

      if (checkExercise && exercises) {
        for (const exercise of exercises) {
          const { id, ...exerciseData } = exercise;

          const newExercise = await Exercise.create({
            ...exerciseData,
            id: uuidv4(),
            workoutId: newWorkout.id,
            userId: userId,
            createdBy: exerciseData.createdBy,
          });

          await Workout_exercises.create({
            workoutId: newWorkout.id,
            exerciseId: newExercise.id,
          });
        }
      }

      return newWorkout;
    } catch (error: any) {
      console.error("Create Workout Service Error:", error);
      throw new Error(error.message);
    }
  }

  async getWorkoutsByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const offset = (page - 1) * limit;

      const { rows: workouts, count } = await Workout.findAndCountAll({
        where: { userId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
          {
            model: Exercise,
            as: "exercises",
            through: { attributes: [] },
            attributes: [
              "id",
              "name",
              "sets",
              "reps",
              "duration",
              "description",
              "media",
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      const formattedWorkouts = workouts.map((workout) => {
        const workoutJSON = workout.toJSON();

        const totalDuration =
          workoutJSON.exercises?.reduce(
            (total, exercise) => total + (exercise.duration || 0),
            0
          ) ?? 0;

        const formattedTime = formatMinutesToHours(totalDuration);

        return {
          id: workoutJSON.id,
          duration: formattedTime,
          userId: workoutJSON.userId,
          userName: workoutJSON.user?.name,
          description: workoutJSON.description,
          name: workoutJSON.name,
          createdBy: workoutJSON.createdBy?.map((creator) => ({
            creatorId: creator.creatorId,
            creatorName: creator.creatorName,
          })),
          exercises:
            workoutJSON.exercises?.map((exercise: Exercise) => ({
              id: exercise.id,
              name: exercise.name,
              sets: exercise.sets,
              reps: exercise.reps,
              duration: exercise.duration,
              media: exercise.media,
              description: exercise.description,
            })) || [],
          createdAt: workoutJSON.createdAt,
          updatedAt: workoutJSON.updatedAt,
        };
      });

      return {
        total: count,
        page,
        limit,
        workouts: formattedWorkouts,
      };
    } catch (error) {
      console.error("Get Workouts By User ID Service Error:", error);
      throw new Error("Failed to fetch workouts");
    }
  }

  async createWorkout(workoutData: WorkoutAttributes) {
    try {
      const id = uuidv4();

      if (!isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }

      const workout = await Workout.create({
        ...workoutData,
        id,
        createdBy: [
          {
            creatorName: workoutData.createdBy?.[0].creatorName as string,
            creatorId: workoutData.userId,
            originalWorkoutId: id,
          },
        ],
      });

      return workout;
    } catch (error: any) {
      console.error("Create Workout Service Error:", error);
      throw new Error(error.message);
    }
  }

  async getAllWorkouts(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;

      const { rows: workouts, count } = await Workout.findAndCountAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
          {
            model: Exercise,
            as: "exercises",
            through: { attributes: [] },
            attributes: [
              "id",
              "name",
              "sets",
              "reps",
              "duration",
              "description",
              "media",
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      const workoutMap = new Map<string, boolean>();
      const uniqueWorkouts: Workout[] = [];

      workouts.forEach((workout: Workout) => {
        const workoutJSON = workout.toJSON() as WorkoutAttributes;
        const key =
          workoutJSON.createdBy?.[0].originalWorkoutId || workoutJSON.id;

        if (!workoutMap.has(key)) {
          workoutMap.set(key, true);
          uniqueWorkouts.push(workout);
        }
      });

      const formattedWorkouts = uniqueWorkouts.map((workout: Workout) => {
        const workoutJSON = workout.toJSON() as WorkoutAttributes;

        const totalDuration =
          workoutJSON.exercises?.reduce(
            (total: number, exercise: ExerciseAttributes) =>
              total + (exercise.duration || 0),
            0
          ) ?? 0;

        const formattedTime = formatMinutesToHours(totalDuration);

        return {
          id: workoutJSON.id,
          duration: formattedTime,
          userId: workoutJSON.userId,
          userName: workoutJSON.user?.name,
          description: workoutJSON.description,
          name: workoutJSON.name,
          createdBy: workoutJSON.createdBy?.map((user: CreatedByType) => ({
            creatorId: user.creatorId,
            creatorName: user.creatorName,
            originalWorkoutId: user.originalWorkoutId,
          })),
          exercises:
            workoutJSON.exercises?.map((exercise: ExerciseAttributes) => ({
              id: exercise.id,
              name: exercise.name,
              sets: exercise.sets,
              reps: exercise.reps,
              duration: exercise.duration,
              media: exercise.media,
              description: exercise.description,
            })) || [],
          createdAt: workoutJSON.createdAt,
          updatedAt: workoutJSON.updatedAt,
        };
      });

      return {
        total: count,
        page,
        limit,
        workouts: formattedWorkouts,
      };
    } catch (error) {
      console.error("Get All Workouts Service Error:", error);
      throw new Error("Failed to fetch workouts");
    }
  }

  async getWorkoutById(id: string) {
    try {
      const workout = await Workout.findByPk(id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
          {
            model: Exercise,
            as: "exercises",
            attributes: ["id", "name", "sets", "reps", "duration"],
          },
        ],
      });

      if (!workout) {
        throw new Error("Workout not found");
      }
      const workoutJSON = workout.toJSON();

      const totalDuration =
        workoutJSON.exercises?.reduce(
          (total, exercise) => total + (exercise.duration || 0),
          0
        ) ?? 0;

      const formattedTime = formatMinutesToHours(totalDuration);

      workout.duration = formattedTime;

      return workout;
    } catch (error) {
      console.error("Get Workout By ID Service Error:", error);
      throw new Error("Workout not found");
    }
  }

  async updateWorkout(id: string, data: Partial<WorkoutAttributes>) {
    console.log(id, data);

    try {
      console.log("Service: Updating workout with ID:", id, "with data:", data);

      const workout = await Workout.findByPk(id);

      if (!workout) {
        throw new Error("Workout not found");
      }

      await workout.update(data);

      return workout;
    } catch (error) {
      console.error("Update Workout Service Error:", error);
      throw new Error("Failed to update workout");
    }
  }

  async deleteWorkout(id: string) {
    try {
      console.log("Service: Deleting workout with ID:", id);
      const workout = await Workout.findByPk(id);
      if (!workout) {
        return 0; // Indicate workout not found
      }
      await workout.destroy();
      return 1; // Indicate workout was deleted
    } catch (error) {
      console.error("Delete Workout Service Error:", error);
      throw new Error("Failed to delete workout");
    }
  }
}

export default new WorkoutService();
