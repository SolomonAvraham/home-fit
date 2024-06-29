import { Router } from "express";
import WorkoutPlanController from "../controllers/workoutPlanController";
 import { validateUUID } from "../middleware/validateUUID";

const router = Router();

 

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
