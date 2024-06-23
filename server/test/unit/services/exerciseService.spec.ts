import { expect } from "chai";
import { sequelize } from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import ExerciseService from "../../../src/services/exerciseService";
import Exercise from "../../../src/models/Exercise";

describe("ExerciseService Unit Tests", () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe("createExercise", () => {
    it("should create an exercise", async () => {
      const exerciseData = {
        name: "Push Up",
        description: "A basic push-up exercise",
        muscleGroup: "Chest",
        media: "push_up.jpg",
      };

      const exercise = await ExerciseService.createExercise(exerciseData);

      expect(exercise).to.have.property("id");
      expect(exercise).to.have.property("name", "Push Up");
      expect(exercise).to.have.property(
        "description",
        "A basic push-up exercise"
      );
      expect(exercise).to.have.property("muscleGroup", "Chest");
      expect(exercise).to.have.property("media", "push_up.jpg");
    });
  });

  describe("getAllExercises", () => {
    it("should get all exercises", async () => {
      const exerciseData = {
        name: "Push Up",
        description: "A basic push-up exercise",
        muscleGroup: "Chest",
        media: "push_up.jpg",
      };

      await ExerciseService.createExercise(exerciseData);

      const exercises = await ExerciseService.getAllExercises();

      expect(exercises).to.be.an("array");
      expect(exercises.length).to.equal(1);
    });
  });

  describe("getExerciseById", () => {
    it("should get an exercise by id", async () => {
      const exerciseData = {
        name: "Push Up",
        description: "A basic push-up exercise",
        muscleGroup: "Chest",
        media: "push_up.jpg",
      };

      const createdExercise = await ExerciseService.createExercise(
        exerciseData
      );
      const exercise = await ExerciseService.getExerciseById(
        createdExercise.id
      );

      expect(exercise).to.have.property("id", createdExercise.id);
      expect(exercise).to.have.property("name", "Push Up");
      expect(exercise).to.have.property(
        "description",
        "A basic push-up exercise"
      );
      expect(exercise).to.have.property("muscleGroup", "Chest");
      expect(exercise).to.have.property("media", "push_up.jpg");
    });

    it("should throw an error if exercise is not found", async () => {
      try {
        await ExerciseService.getExerciseById("non-existent-id");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format");
        }
      }
    });
  });

  describe("updateExercise", () => {
    it("should update an exercise", async () => {
      const exerciseData = {
        name: "Push Up",
        description: "A basic push-up exercise",
        muscleGroup: "Chest",
        media: "push_up.jpg",
      };

      const createdExercise = await ExerciseService.createExercise(
        exerciseData
      );
      const updatedExercise = await ExerciseService.updateExercise(
        createdExercise.id,
        {
          description: "An updated description",
        }
      );

      expect(updatedExercise).to.have.property(
        "description",
        "An updated description"
      );
    });

    it("should throw an error if exercise is not found", async () => {
      try {
        await ExerciseService.updateExercise("non-existent-id", {
          description: "An updated description",
        });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format");
        }
      }
    });
  });

  describe("deleteExercise", () => {
    it("should delete an exercise", async () => {
      const exerciseData = {
        name: "Push Up",
        description: "A basic push-up exercise",
        muscleGroup: "Chest",
        media: "push_up.jpg",
      };

      const createdExercise = await ExerciseService.createExercise(
        exerciseData
      );
      const deletedExercise = await ExerciseService.deleteExercise(
        createdExercise.id
      );

      expect(deletedExercise).to.have.property("id", createdExercise.id);
    });

    it("should throw an error if exercise is not found", async () => {
      try {
        await ExerciseService.deleteExercise("non-existent-id");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format");
        }
      }
    });
  });
});
