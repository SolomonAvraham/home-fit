import { Router } from "express";
import WorkoutPlanController from "../controllers/workoutPlanController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateUUID } from "../middleware/validateUUID";

const router = Router();

if (process.env.NODE_ENV !== "test") {
  router.use(authMiddleware);
}

router.post("/createWorkoutPlan", WorkoutPlanController.createWorkoutPlan);
router.get("/all", WorkoutPlanController.getAllWorkoutPlans);
router.get(
  "/getWorkoutPlanById/:id",
  validateUUID,
  WorkoutPlanController.getWorkoutPlanById
);
router.put(
  "/updateWorkoutPlan/:id",
  validateUUID,
  WorkoutPlanController.updateWorkoutPlan
);
router.delete(
  "/deleteWorkoutPlan/:id",
  validateUUID,
  WorkoutPlanController.deleteWorkoutPlan
);

export default router;
