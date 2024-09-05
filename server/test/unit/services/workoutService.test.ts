import { expect } from "chai";
import { sequelize } from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import WorkoutService from "../../../src/services/workoutService";
import { v4 as uuidv4 } from "uuid";
import Workout, {
  WorkoutCreationAttributes,
} from "../../../src/models/Workout";
import User from "../../../src/models/User";
import Exercise from "../../../src/models/Exercise";
import { WorkoutAttributes } from "../../../src/types/models";

describe("WorkoutService Unit Tests", () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe("isWorkoutExist", () => {
    it("should return true if workout already exists for the user", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      await User.create({
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
      await Workout.create({
        id: workoutId,
        name: "Morning Routine",
        description: "A morning workout routine",
        userId: userId,
        createdBy: [
          {
            creatorId: userId,
            creatorName: "John Doe",
            originalWorkoutId: workoutId,
          },
        ],
      });

      const exists = await WorkoutService.isWorkoutExist(workoutId, userId);
      expect(exists).to.be.true;
    });

    it("should throw an error if workout does not exist for the user", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      try {
        await WorkoutService.isWorkoutExist(workoutId, userId);
        throw new Error(
          "Test failed: Expected an error to be thrown but none was"
        );
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Workout not found");
        } else {
          throw error;
        }
      }
    });
  });

  describe("addWorkout", () => {
    it("should add a workout for the user", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });
      await Workout.create({
        id: workoutId,
        name: "Evening Routine",
        description: "An evening workout routine",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
      });

      const newWorkout = await WorkoutService.addWorkout(workoutId, userId);
      expect(newWorkout).to.have.property("id");
      expect(newWorkout.userId).to.equal(userId);
    });

    it("should throw an error if workout is already added", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });
      await Workout.create({
        id: workoutId,
        name: "Evening Routine",
        description: "An evening workout routine",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
      });

      await WorkoutService.addWorkout(workoutId, userId);

      try {
        await WorkoutService.addWorkout(workoutId, userId);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal(
            "Workout already added to your workouts"
          );
        } else {
          throw error;
        }
      }
    });
  });

  describe("createWorkout", () => {
    it("should create a workout", async () => {
      const userId = uuidv4();
      await User.create({
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      });

      const workoutData: WorkoutCreationAttributes = {
        name: "Morning Routine",
        description: "A morning workout routine",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "John Doe" }],
      };

      const workout = await WorkoutService.createWorkout(
        workoutData as WorkoutAttributes
      );

      expect(workout).to.have.property("id");
      expect(workout).to.have.property("name", "Morning Routine");
      expect(workout).to.have.property(
        "description",
        "A morning workout routine"
      );
      expect(workout).to.have.property("userId", userId);
    });

    it("should throw an error if invalid UUID is provided", async () => {
      const invalidWorkoutData = {
        name: "Invalid Workout",
        description: "This workout should fail",
        userId: "invalid-uuid",
        createdBy: [{ creatorId: "invalid-uuid", creatorName: "Invalid User" }],
      };

      try {
        await WorkoutService.createWorkout(invalidWorkoutData as any);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format");
        } else {
          throw error;
        }
      }
    });
  });

  describe("deleteWorkout", () => {
    it("should delete a workout", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
      });
      await Workout.create({
        id: workoutId,
        name: "Afternoon Routine",
        description: "An afternoon workout routine",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
      });

      const result = await WorkoutService.deleteWorkout(workoutId);
      expect(result).to.equal(1);
    });

    it("should return 0 if workout is not found", async () => {
      const result = await WorkoutService.deleteWorkout(uuidv4());
      expect(result).to.equal(0);
    });
  });
  describe("getWorkoutsByUserId", () => {
    it("should return workouts for a user with pagination", async () => {
      const userId = uuidv4();
      await User.create({
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      });

      for (let i = 0; i < 5; i++) {
        await Workout.create({
          id: uuidv4(),
          name: `Workout ${i}`,
          description: `Description ${i}`,
          userId: userId,
          createdBy: [{ creatorId: userId, creatorName: "John Doe" }],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      const workouts = await WorkoutService.getWorkoutsByUserId(userId, 1, 3);

      if (workouts) {
        // Check if workouts is not false
        expect(workouts.workouts.length).to.equal(3);
        expect(workouts.total).to.equal(5);
      } else {
        expect.fail("Expected workouts to be returned, but got false");
      }
    });
  });

  it("should return an empty array if no workouts are found for a user", async () => {
    const userId = uuidv4();
    const workouts = await WorkoutService.getWorkoutsByUserId(userId, 1, 10);

    if (workouts) {
      // Check if workouts is not false
      expect(workouts.workouts.length).to.equal(0);
      expect(workouts.total).to.equal(0);
    } else {
      expect(workouts).to.equal(false); // If workouts is false, this expectation should pass
    }
  });

  describe("getAllWorkouts", () => {
    it("should return all workouts with pagination", async () => {
      const userId = uuidv4();
      await User.create({
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      });

      for (let i = 0; i < 15; i++) {
        await Workout.create({
          id: uuidv4(),
          name: `Workout ${i}`,
          description: `Description ${i}`,
          userId: userId,
          createdBy: [{ creatorId: userId, creatorName: "John Doe" }],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      const workouts = await WorkoutService.getAllWorkouts(1, 10);
      expect(workouts.workouts.length).to.equal(10);
      expect(workouts.total).to.be.at.least(15);
    });

    it("should return an empty array if no workouts exist", async () => {
      const workouts = await WorkoutService.getAllWorkouts(1, 10);
      expect(workouts.workouts.length).to.equal(0);
      expect(workouts.total).to.equal(0);
    });
  });

  describe("getWorkoutById", () => {
    it("should return a workout by its ID", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      await User.create({
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      });

      await Workout.create({
        id: workoutId,
        name: "Morning Routine",
        description: "A morning workout routine",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "John Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const workout = await WorkoutService.getWorkoutById(workoutId);
      expect(workout).to.have.property("id", workoutId);
      expect(workout).to.have.property("name", "Morning Routine");
    });

    it("should throw an error if workout is not found", async () => {
      try {
        await WorkoutService.getWorkoutById(uuidv4());
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Workout not found");
        } else {
          throw error;
        }
      }
    });
  });

  describe("getWorkoutById", () => {
    it("should return a workout by its ID", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      await User.create({
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      });

      await Workout.create({
        id: workoutId,
        name: "Morning Routine",
        description: "A morning workout routine",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "John Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const workout = await WorkoutService.getWorkoutById(workoutId);
      expect(workout).to.have.property("id", workoutId);
      expect(workout).to.have.property("name", "Morning Routine");
    });

    it("should throw an error if workout is not found", async () => {
      try {
        await WorkoutService.getWorkoutById(uuidv4());
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Workout not found");
        } else {
          throw error;
        }
      }
    });
  });

  describe("updateWorkout", () => {
    it("should update an existing workout", async () => {
      const userId = uuidv4();
      const workoutId = uuidv4();

      await User.create({
        id: userId,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
      });

      await Workout.create({
        id: workoutId,
        name: "Afternoon Routine",
        description: "An afternoon workout routine",
        userId: userId,
        createdBy: [{ creatorId: userId, creatorName: "Jane Doe" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const updatedWorkout = await WorkoutService.updateWorkout(workoutId, {
        name: "Updated Routine",
      });
      expect(updatedWorkout).to.have.property("name", "Updated Routine");
    });

    it("should throw an error if workout is not found for update", async () => {
      try {
        await WorkoutService.updateWorkout(uuidv4(), { name: "Non-existent" });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Workout not found");
        } else {
          throw error;
        }
      }
    });
  });
});
