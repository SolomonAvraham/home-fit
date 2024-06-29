import { Router } from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.get("/all", authMiddleware, UserController.getAllUsers);
router.get("/getUserById/:id", authMiddleware, UserController.getUserById);
router.put("/updateUser/:id", authMiddleware, UserController.updateUser);
router.delete("/deleteUser/:id", authMiddleware, UserController.deleteUser);

export default router;
