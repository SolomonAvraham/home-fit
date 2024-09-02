import { Router } from "express";
import ExerciseController from "../controllers/exerciseController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/:exerciseId/user/:userId/add", ExerciseController.addExercise);
router.post(
  "/:exerciseId/workouts/:workoutId/add",
  ExerciseController.addExerciseToWorkout
);
router.post("/createExercise", ExerciseController.createExercise);

router.get("/all", ExerciseController.getAllExercises);
router.get("/user/:userId", ExerciseController.getExercisesByUserId);
router.get("/getExerciseById/:id", ExerciseController.getExerciseById);
router.get(
  "/isExerciseInWorkout/:exerciseId/user/:userId",
  ExerciseController.isExerciseInWorkout
);
router.get(
  "/isExerciseExist/:exerciseId/user/:userId",
  ExerciseController.isExerciseExist
);

router.put("/updateExercise/:id", ExerciseController.updateExercise);

router.delete("/deleteExercise/:id", ExerciseController.deleteExercise);

export default router;
