import { Router } from "express";
import WorkoutController from "../controllers/workoutController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateUUID } from "../middleware/validateUUID";

const router = Router();

if (process.env.NODE_ENV !== "test") {
  router.use(authMiddleware);
}

router.post("/createWorkout", WorkoutController.createWorkout);
router.get("/all", WorkoutController.getAllWorkouts);
router.get("/WorkoutById/:id", validateUUID, WorkoutController.getWorkoutById);
router.put("/updateWorkout/:id", validateUUID, WorkoutController.updateWorkout);
router.delete(
  "/deleteWorkout/:id",
  validateUUID,
  WorkoutController.deleteWorkout
);

export default router;
