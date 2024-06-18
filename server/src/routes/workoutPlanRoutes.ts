import { Router } from "express";
import   WorkoutPlanController   from "../controllers/workoutPlanController";

const router = Router();

router.post("/", WorkoutPlanController.createWorkoutPlan);
router.get("/all", WorkoutPlanController.getAllWorkoutPlans);
router.get("/:id", WorkoutPlanController.getWorkoutPlanById);
router.put("/:id", WorkoutPlanController.updateWorkoutPlan);
router.delete("/:id", WorkoutPlanController.deleteWorkoutPlan);

export default router;
