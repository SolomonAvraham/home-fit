import { Router } from "express";
import WorkoutController from "../controllers/workoutController";
import { validateUUID } from "../middleware/validateUUID";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/addWorkout/:id/user/:userId",
  authMiddleware,
  WorkoutController.addWorkout
);
router.post("/createWorkout", authMiddleware, WorkoutController.createWorkout);

router.get("/isWorkoutExist", authMiddleware, WorkoutController.isWorkoutExist);
router.get("/all", WorkoutController.getAllWorkouts);
router.get("/WorkoutById/:id", validateUUID, WorkoutController.getWorkoutById);
router.get(
  "/WorkoutsByUserId/:id",
  validateUUID,
  authMiddleware,
  WorkoutController.getWorkoutsByUserId
);

router.put(
  "/updateWorkout/:id",
  validateUUID,
  authMiddleware,
  WorkoutController.updateWorkout
);
router.delete(
  "/deleteWorkout/:id",
  validateUUID,
  authMiddleware,
  WorkoutController.deleteWorkout
);

export default router;
