import { expect } from "chai";
import {
  sequelize,
  Workout,
  Workout_exercises,
  Exercise,
  User,
} from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import ExerciseService from "../../../src/services/exerciseService";
import { v4 as uuidv4 } from "uuid";
import { ExerciseAttributes } from "../../../src/types/models";  

describe("ExerciseService Unit Tests", () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe("isExerciseExist", () => {
    it("should return true if exercise exists for the user", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();

      await User.create({
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await Exercise.create({
        id: exerciseId,
        name: "Push Up",
        description: "A basic push-up exercise",
        userId: userId,
        createdBy: [
          {
            creatorId: userId,
            creatorName: "John Doe",
            originalExerciseId: exerciseId,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const exists = await ExerciseService.isExerciseExist({
        exerciseId,
        userId,
      });
      expect(exists).to.be.true;
    });

    it("should throw an error if exercise does not exist for the user", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();

      try {
        await ExerciseService.isExerciseExist({ exerciseId, userId });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Exercise not found");
        } else {
          throw error;
        }
      }
    });
  });

  describe("addExercise", () => {
    it("should add an exercise for the user", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();

       
      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

       const exercise = await Exercise.create({
        id: exerciseId,
        name: "Squat",
        description: "A basic squat exercise",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

       const newExercise = await ExerciseService.addExercise({
        exerciseId: exercise.id,
        userId: exercise.userId,
      });

      expect(newExercise).to.have.property("id");
      expect(newExercise.userId).to.equal(userId);
    });

    it("should throw an error if exercise already added for the user", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();

      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await Exercise.create({
        id: exerciseId,
        name: "Squat",
        description: "A basic squat exercise",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
 
      await ExerciseService.addExercise({ exerciseId, userId });

      try {
        
        await ExerciseService.addExercise({ exerciseId, userId });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal(
            "Exercise already added for this user"
          );
        } else {
          throw error;
        }
      }
    });
  });

  describe("createExercise", () => {
    describe("createExercise", () => {
      it("should throw an error if the YouTube URL is invalid", async () => {
        const userId = uuidv4();

        await User.create({
          id: userId,
          name: "John Doe",
          email: "john.doe@example.com",
          password: "password123",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const exerciseData: ExerciseAttributes = {
          id: uuidv4(),
          name: "Invalid Media Exercise",
          description: "An exercise with invalid media URL",
          sets: 3,
          reps: 10,
          duration: 30,
          media: "https://invalid-url.com",  
          userId: userId,
          createdBy: [{ creatorId: userId, creatorName: "John Doe" }],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        try {
          await ExerciseService.createExercise(exerciseData);
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).to.equal("Invalid YouTube URL");
          } else {
            throw error;
          }
        }
      });
    });

    it("should create an exercise", async () => {
      const userId = uuidv4();

      await User.create({
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const exerciseData: ExerciseAttributes = {
        id: uuidv4(),
        name: "Burpee",
        description: "A full-body exercise",
        sets: 3,
        reps: 10,
        duration: 30,
        media: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "John Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const exercise = await ExerciseService.createExercise(exerciseData);

      expect(exercise).to.have.property("id");
      expect(exercise).to.have.property("name", "Burpee");
      expect(exercise).to.have.property("description", "A full-body exercise");
      expect(exercise).to.have.property("userId", userId);
      expect(exercise).to.have.property(
        "media",
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      );
    });

    it("should throw an error if invalid UUID is provided", async () => {
      const invalidExerciseData = {
        name: "Invalid Exercise",
        description: "This exercise should fail",
        userId: "invalid-uuid",  
        createdBy: [{ creatorId: "invalid-uuid", creatorName: "Invalid User" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        await ExerciseService.createExercise(invalidExerciseData as any);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format");
        } else {
          throw error;
        }
      }
    });
  });

  describe("deleteExercise", () => {
    it("should delete an exercise", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();

      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await Exercise.create({
        id: exerciseId,
        name: "Jump Rope",
        description: "A cardio exercise",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const deletedExercise = await ExerciseService.deleteExercise(exerciseId);
      expect(deletedExercise).to.have.property("id", exerciseId);
    });

    it("should throw an error if exercise is not found", async () => {
      try {
        await ExerciseService.deleteExercise(uuidv4());
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Exercise not found");
        } else {
          throw error;
        }
      }
    });
  });

  describe("isExerciseInWorkout", () => {
    it("should return workouts excluding the one containing the exercise", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();
      const workoutId = uuidv4();

       await User.create({
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      await Exercise.create({
        id: exerciseId,
        name: "Push Up",
        description: "A basic push-up exercise",
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: [
          {
            creatorId: userId,
            creatorName: "John Doe",
            originalExerciseId: exerciseId,
          },
        ],
      });

      await Workout.create({
        id: workoutId,
        name: "Morning Workout",
        userId: userId,
        description: "An evening workout routine",
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
      });

      await Workout_exercises.create({ workoutId, exerciseId });

      const workouts = await ExerciseService.isExerciseInWorkout({
        exerciseId,
        userId,
      });
      expect(workouts).to.be.false;
    });

    it("should throw an error if exercise is not found", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();

      try {
        await ExerciseService.isExerciseInWorkout({ exerciseId, userId });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Exercise not found");
        } else {
          throw error;
        }
      }
    });
  });

  describe("addExerciseToWorkout", () => {
    it("should add an exercise to a workout", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();
      const workoutId = uuidv4();

       await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });

      await Workout.create({
        id: workoutId,
        name: "Leg Day",
        userId: userId,
        description: "An evening workout routine",
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
      });

      await Exercise.create({
        id: exerciseId,
        name: "Squat",
        description: "A basic squat exercise",
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: [
          {
            creatorId: userId,
            creatorName: "John Doe",
            originalExerciseId: exerciseId,
          },
        ],
      });

      const result = await ExerciseService.addExerciseToWorkout({
        exerciseId,
        workoutId,
      });
      expect(result).to.have.property("exerciseId", exerciseId);
      expect(result).to.have.property("workoutId", workoutId);
    });

    it("should throw an error if exercise already added to the workout", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();
      const workoutId = uuidv4();

       await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });

      await Workout.create({
        id: workoutId,
        name: "Leg Day",
        userId: userId,
        description: "An evening workout routine",
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
      });

      await Exercise.create({
        id: exerciseId,
        name: "Squat",
        description: "A basic squat exercise",
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: [
          {
            creatorId: userId,
            creatorName: "John Doe",
            originalExerciseId: exerciseId,
          },
        ],
      });
      await Workout_exercises.create({ workoutId, exerciseId });

      try {
        await ExerciseService.addExerciseToWorkout({ exerciseId, workoutId });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal(
            "Exercise already added to this workout"
          );
        } else {
          throw error;
        }
      }
    });
  });

  describe("getAllExercises", () => {
    it("should return all exercises with pagination", async () => {
      const userId = uuidv4();
      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });

      for (let i = 0; i < 15; i++) {
        await Exercise.create({
          id: uuidv4(),
          name: `Exercise ${i}`,
          description: `Description ${i}`,
          userId: userId,
          createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      const exercises = await ExerciseService.getAllExercises(1, 10);
      expect(exercises.exercises.length).to.equal(10);
      expect(exercises.total).to.be.at.least(15);
    });

    it("should throw an error if pagination parameters are invalid", async () => {
      try {
        await ExerciseService.getAllExercises(-1, 10);  
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Failed to fetch exercises");
        } else {
          throw error;
        }
      }
    });

    it("should return empty if no exercises exist", async () => {
      const exercises = await ExerciseService.getAllExercises(1, 10);
      expect(exercises.exercises.length).to.equal(0);
      expect(exercises.total).to.equal(0);
    });
  });

  describe("getExercisesByUserId", () => {
    it("should throw an error if user ID does not exist", async () => {
      try {
        await ExerciseService.getExercisesByUserId("non-existent-id", 1, 10);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Failed to fetch exercises");
        } else {
          throw error;
        }
      }
    });
  });

  describe("updateExercise", () => {
    it("should update an exercise", async () => {
      const userId = uuidv4();
      const exerciseId = uuidv4();

      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const exercise = await Exercise.create({
        id: exerciseId,
        name: "Jump Rope",
        description: "A cardio exercise",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const updatedData = { name: "Advanced Jump Rope", sets: 5 };
      const updatedExercise = await ExerciseService.updateExercise(
        exerciseId,
        updatedData
      );

      expect(updatedExercise).to.have.property("name", "Advanced Jump Rope");
      expect(updatedExercise).to.have.property("sets", 5);
    });

    it("should throw an error if exercise to update is not found", async () => {
      try {
        await ExerciseService.updateExercise(uuidv4(), { name: "Updated" });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Exercise not found");
        } else {
          throw error;
        }
      }
    });
  });

});
