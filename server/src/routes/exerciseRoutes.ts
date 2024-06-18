import { Router } from "express";
import { ExerciseController } from "../controllers/exerciseController";

const router = Router();

router.post("/", ExerciseController.createExercise);
router.get("/all", ExerciseController.getAllExercises);
router.get("/:id", ExerciseController.getExerciseById);
router.put("/:id", ExerciseController.updateExercise);
router.delete("/:id", ExerciseController.deleteExercise);

export default router;
