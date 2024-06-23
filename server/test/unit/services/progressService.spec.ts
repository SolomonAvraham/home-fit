import { expect } from "chai";
import { sequelize } from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import ProgressService from "../../../src/services/progressService";
import Progress from "../../../src/models/Progress";
import User from "../../../src/models/User";
import Workout from "../../../src/models/Workout";
import WorkoutPlan from "../../../src/models/WorkoutPlan";
import { v4 as uuidv4 } from "uuid";

describe("ProgressService Unit Tests", () => {
  let userId: string;
  let workoutId: string;
  let workoutPlanId: string;

  before(async () => {
    await sequelize.sync({ force: true });

    // Create a dummy user, workout plan, and workout entry
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userId = user.id;

    const workoutPlan = await WorkoutPlan.create({
      name: "Test Workout Plan",
      description: "Test Description",
      userId,
    });

    workoutPlanId = workoutPlan.id;

    const workout = await Workout.create({
      date: new Date(),
      duration: 60,
      userId,
      workoutPlanId,
    });

    workoutId = workout.id;
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    // Re-create the dummy user, workout plan, and workout entry
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userId = user.id;

    const workoutPlan = await WorkoutPlan.create({
      name: "Test Workout Plan",
      description: "Test Description",
      userId,
    });

    workoutPlanId = workoutPlan.id;

    const workout = await Workout.create({
      date: new Date(),
      duration: 60,
      userId,
      workoutPlanId,
    });

    workoutId = workout.id;
  });

  describe("createProgress", () => {
    it("should create progress", async () => {
      const progressData = {
        date: new Date(),
        userId,
        workoutId,
        performanceMetrics: { weight: 70, reps: 10 },
      };

      const progress = await ProgressService.createProgress(progressData);

      expect(progress).to.have.property("id");
      expect(progress).to.have.property("date");
      expect(progress).to.have.property("userId", userId);
      expect(progress).to.have.property("workoutId", workoutId);
      expect(progress.performanceMetrics).to.deep.equal({
        weight: 70,
        reps: 10,
      });
    });
  });

  describe("getProgressById", () => {
    it("should get progress by id", async () => {
      const progressData = {
        date: new Date(),
        userId,
        workoutId,
        performanceMetrics: { weight: 70, reps: 10 },
      };

      const createdProgress = await ProgressService.createProgress(
        progressData
      );
      const progress = await ProgressService.getProgressById(
        createdProgress.id
      );

      expect(progress).to.have.property("id", createdProgress.id);
      expect(progress).to.have.property("date");
      expect(progress).to.have.property("userId", userId);
      expect(progress).to.have.property("workoutId", workoutId);
      expect(progress?.performanceMetrics).to.deep.equal({
        weight: 70,
        reps: 10,
      });
    });

    it("should throw an error if progress is not found", async () => {
      try {
        const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
        await ProgressService.getProgressById(nonExistentId);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Progress not found");
        }
      }
    });
  });

  describe("getAllProgress", () => {
    it("should get all progress", async () => {
      await ProgressService.createProgress({
        date: new Date(),
        userId,
        workoutId,
        performanceMetrics: { weight: 70, reps: 10 },
      });

      const progressList = await ProgressService.getAllProgress();

      expect(progressList).to.be.an("array");
      expect(progressList.length).to.equal(1);
    });
  });

  describe("updateProgress", () => {
    it("should update progress", async () => {
      const progressData = {
        date: new Date(),
        userId,
        workoutId,
        performanceMetrics: { weight: 70, reps: 10 },
      };

      const createdProgress = await ProgressService.createProgress(
        progressData
      );
      const updatedProgress = await ProgressService.updateProgress(
        createdProgress.id,
        {
          performanceMetrics: { weight: 75, reps: 12 },
        }
      );

      expect(updatedProgress?.performanceMetrics).to.deep.equal({
        weight: 75,
        reps: 12,
      });
    });

    it("should throw an error if progress is not found", async () => {
      try {
        const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
        await ProgressService.updateProgress(nonExistentId, {
          performanceMetrics: { weight: 75, reps: 12 },
        });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Progress not found");
        }
      }
    });
  });

  describe("deleteProgress", () => {
    it("should delete progress", async () => {
      const progressData = {
        date: new Date(),
        userId,
        workoutId,
        performanceMetrics: { weight: 70, reps: 10 },
      };

      const createdProgress = await ProgressService.createProgress(
        progressData
      );
      const deleteCount = await ProgressService.deleteProgress(
        createdProgress.id
      );

      expect(deleteCount).to.equal(1);
    });

    it("should return 0 if progress is not found", async () => {
      const nonExistentId = uuidv4(); // Generate a valid UUID for non-existent ID
      const deleteCount = await ProgressService.deleteProgress(nonExistentId);

      expect(deleteCount).to.equal(0);
    });
  });
});
