import { Router } from "express";
import WorkoutController from "../controllers/workoutController";
import { validateUUID } from "../middleware/validateUUID";

const router = Router();

router.post("/addWorkout/:id/user/:userId", WorkoutController.addWorkout);
router.post("/createWorkout", WorkoutController.createWorkout);

router.get("/isWorkoutExist", WorkoutController.isWorkoutExist);
router.get("/all", WorkoutController.getAllWorkouts);
router.get("/WorkoutById/:id", validateUUID, WorkoutController.getWorkoutById);
router.get(
  "/WorkoutsByUserId/:id",
  validateUUID,
  WorkoutController.getWorkoutsByUserId
);

router.put("/updateWorkout/:id", validateUUID, WorkoutController.updateWorkout);
router.delete(
  "/deleteWorkout/:id",
  validateUUID,
  WorkoutController.deleteWorkout
);

export default router;
