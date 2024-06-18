import { Router } from "express";
import WorkoutController from "../controllers/workoutController";

const router = Router();

router.post("/", WorkoutController.createWorkout);
router.get("/all", WorkoutController.getAllWorkouts);
router.get("/:id", WorkoutController.getWorkoutById);
router.put("/:id", WorkoutController.updateWorkout);
router.delete("/:id", WorkoutController.deleteWorkout);

export default router;
