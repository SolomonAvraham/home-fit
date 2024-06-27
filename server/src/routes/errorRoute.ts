import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  next(new Error("Test error"));
});

export default router;
