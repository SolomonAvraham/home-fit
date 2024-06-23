import { Router } from "express";
import ProgressController from "../controllers/progressController";

const router = Router();

router.post("/createProgress", ProgressController.createProgress);
router.get("/all", ProgressController.getAllProgress);
router.get("/getProgressById/:id", ProgressController.getProgressById);
router.put("/updateProgress/:id", ProgressController.updateProgress);
router.delete("/deleteProgress/:id", ProgressController.deleteProgress);

export default router;
