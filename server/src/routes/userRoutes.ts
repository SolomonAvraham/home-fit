import { Router } from "express";
import UserController from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/:id", authMiddleware, UserController.getUserById);
router.get("/all", authMiddleware, UserController.getAllUsers);
router.put("/:id", authMiddleware, UserController.updateUser);
router.delete("/:id", authMiddleware, UserController.deleteUser);

export default router;
