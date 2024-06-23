import { expect } from "chai";
import { sequelize } from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import WorkoutPlanService from "../../../src/services/workoutPlanService";
import WorkoutPlan from "../../../src/models/WorkoutPlan";
import User from "../../../src/models/User";
import { v4 as uuidv4 } from "uuid";

describe("WorkoutPlanService Unit Tests", () => {
  let userId: string;

  before(async () => {
    await sequelize.sync({ force: true });

    // Create a dummy user entry
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userId = user.id;
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    // Re-create the dummy user entry
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userId = user.id;
  });

  describe("createWorkoutPlan", () => {
    it("should create a workout plan", async () => {
      const workoutPlanData = {
        name: "Plan 1",
        description: "This is plan 1",
        userId,
      };

      const workoutPlan = await WorkoutPlanService.createWorkoutPlan(
        workoutPlanData
      );

      expect(workoutPlan).to.have.property("id");
      expect(workoutPlan).to.have.property("name", "Plan 1");
      expect(workoutPlan).to.have.property("description", "This is plan 1");
      expect(workoutPlan).to.have.property("userId", userId);
    });
  });

  describe("getWorkoutPlanById", () => {
    it("should get a workout plan by id", async () => {
      const workoutPlanData = {
        name: "Plan 1",
        description: "This is plan 1",
        userId,
      };

      const createdWorkoutPlan = await WorkoutPlanService.createWorkoutPlan(
        workoutPlanData
      );
      const workoutPlan = await WorkoutPlanService.getWorkoutPlanById(
        createdWorkoutPlan.id
      );

      expect(workoutPlan).to.have.property("id", createdWorkoutPlan.id);
      expect(workoutPlan).to.have.property("name", "Plan 1");
      expect(workoutPlan).to.have.property("description", "This is plan 1");
      expect(workoutPlan).to.have.property("userId", userId);
    });

    it("should throw an error if workout plan is not found", async () => {
      try {
        const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
        await WorkoutPlanService.getWorkoutPlanById(nonExistentId);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Workout plan not found");
        }
      }
    });
  });

  describe("getAllWorkoutPlans", () => {
    it("should get all workout plans", async () => {
      await WorkoutPlanService.createWorkoutPlan({
        name: "Plan 1",
        description: "This is plan 1",
        userId,
      });

      const workoutPlans = await WorkoutPlanService.getAllWorkoutPlans();

      expect(workoutPlans).to.be.an("array");
      expect(workoutPlans.length).to.equal(1);
    });
  });

  describe("updateWorkoutPlan", () => {
    it("should update a workout plan", async () => {
      const workoutPlanData = {
        name: "Plan 1",
        description: "This is plan 1",
        userId,
      };

      const createdWorkoutPlan = await WorkoutPlanService.createWorkoutPlan(
        workoutPlanData
      );
      const updatedWorkoutPlan = await WorkoutPlanService.updateWorkoutPlan(
        createdWorkoutPlan.id,
        {
          name: "Updated Plan 1",
        }
      );

      expect(updatedWorkoutPlan).to.have.property("name", "Updated Plan 1");
    });

    it("should throw an error if workout plan is not found", async () => {
      try {
        const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
        await WorkoutPlanService.updateWorkoutPlan(nonExistentId, {
          name: "Updated Plan 1",
        });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Workout plan not found");
        }
      }
    });
  });

  describe("deleteWorkoutPlan", () => {
    it("should delete a workout plan", async () => {
      const workoutPlanData = {
        name: "Plan 1",
        description: "This is plan 1",
        userId,
      };

      const createdWorkoutPlan = await WorkoutPlanService.createWorkoutPlan(
        workoutPlanData
      );
      const deleteCount = await WorkoutPlanService.deleteWorkoutPlan(
        createdWorkoutPlan.id
      );

      expect(deleteCount).to.equal(1);
    });

    it("should return 0 if workout plan is not found", async () => {
      const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
      const deleteCount = await WorkoutPlanService.deleteWorkoutPlan(
        nonExistentId
      );

      expect(deleteCount).to.equal(0);
    });
  });
});
