import { Router } from "express";
import { ExerciseController } from "../controllers/exerciseController";

const router = Router();

router.post("/createExercise", ExerciseController.createExercise);
router.get("/all", ExerciseController.getAllExercises);
router.get("/getExerciseById/:id", ExerciseController.getExerciseById);
router.put("/updateExercise/:id", ExerciseController.updateExercise);
router.delete("/deleteExercise/:id", ExerciseController.deleteExercise);

export default router;
