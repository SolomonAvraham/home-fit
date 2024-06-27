import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

router.get("/error", (req, res) => {
  throw new Error("Test error");
});

export default router;
