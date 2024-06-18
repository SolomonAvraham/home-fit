import { Router } from "express";
import   ProgressController   from "../controllers/progressController";

const router = Router();

router.post("/", ProgressController.createProgress);
router.get("/all", ProgressController.getAllProgress);
router.get("/:id", ProgressController.getProgressById);
router.put("/:id", ProgressController.updateProgress);
router.delete("/:id", ProgressController.deleteProgress);

export default router;
