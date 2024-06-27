import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

export default router;
