import { expect } from "chai";
import { sequelize } from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import WorkoutService from "../../../src/services/workoutService";
import Workout from "../../../src/models/Workout";
import User from "../../../src/models/User";
import WorkoutPlan from "../../../src/models/WorkoutPlan";
import { v4 as uuidv4, validate as validateUuid } from "uuid";

describe("WorkoutService Unit Tests", () => {
  let userId: string;
  let workoutPlanId: string;

  before(async () => {
    await sequelize.sync({ force: true });

    // Create dummy user and workout plan entries
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const workoutPlan = await WorkoutPlan.create({
      name: "Test Plan",
      description: "This is a test workout plan",
      userId: user.id,
    });

    userId = user.id;
    workoutPlanId = workoutPlan.id;
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const workoutPlan = await WorkoutPlan.create({
      name: "Test Plan",
      description: "This is a test workout plan",
      userId: user.id,
    });

    userId = user.id;
    workoutPlanId = workoutPlan.id;
  });

  describe("createWorkout", () => {
    it("should create a workout", async () => {
      const workoutData = {
        date: new Date(),
        duration: 60,
        userId,
        workoutPlanId,
      };

      const workout = await WorkoutService.createWorkout(workoutData);

      expect(workout).to.have.property("id");
      expect(workout).to.have.property("date");
      expect(workout).to.have.property("duration", 60);
      expect(workout).to.have.property("userId", userId);
      expect(workout).to.have.property("workoutPlanId", workoutPlanId);
    });
  });

  describe("getWorkoutById", () => {
    it("should get a workout by id", async () => {
      const workoutData = {
        date: new Date(),
        duration: 60,
        userId,
        workoutPlanId,
      };

      const createdWorkout = await WorkoutService.createWorkout(workoutData);
      const workout = await WorkoutService.getWorkoutById(createdWorkout.id);

      expect(workout).to.have.property("id", createdWorkout.id);
      expect(workout).to.have.property("date");
      expect(workout).to.have.property("duration", 60);
      expect(workout).to.have.property("userId", userId);
      expect(workout).to.have.property("workoutPlanId", workoutPlanId);
    });

    it("should throw an error if workout is not found", async () => {
      try {
        const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
        await WorkoutService.getWorkoutById(nonExistentId);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Workout not found");
        }
      }
    });
  });

  describe("getAllWorkouts", () => {
    it("should get all workouts", async () => {
      await WorkoutService.createWorkout({
        date: new Date(),
        duration: 60,
        userId,
        workoutPlanId,
      });

      const workouts = await WorkoutService.getAllWorkouts();

      expect(workouts).to.be.an("array");
      expect(workouts.length).to.equal(1);
    });
  });

  describe("updateWorkout", () => {
    it("should update a workout", async () => {
      const workoutData = {
        date: new Date(),
        duration: 60,
        userId,
        workoutPlanId,
      };

      const createdWorkout = await WorkoutService.createWorkout(workoutData);
      const updatedWorkout = await WorkoutService.updateWorkout(
        createdWorkout.id,
        {
          duration: 90,
        }
      );

      expect(updatedWorkout).to.have.property("id", createdWorkout.id);
      expect(updatedWorkout).to.have.property("duration", 90);
    });
  });

  describe("deleteWorkout", () => {
    it("should delete a workout", async () => {
      const workoutData = {
        date: new Date(),
        duration: 60,
        userId,
        workoutPlanId,
      };

      const createdWorkout = await WorkoutService.createWorkout(workoutData);
      const deleteCount = await WorkoutService.deleteWorkout(createdWorkout.id);

      expect(deleteCount).to.equal(1);
    });

    it("should return 0 if workout is not found", async () => {
      const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
      const deleteCount = await WorkoutService.deleteWorkout(nonExistentId);

      expect(deleteCount).to.equal(0);
    });
  });
});
