"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/register", userController_1.default.createUser);
router.post("/login", userController_1.default.login);
router.get("/logout", userController_1.default.logout);
router.get("/all", authMiddleware_1.default, userController_1.default.getAllUsers);
router.get("/getUserById/:id", authMiddleware_1.default, userController_1.default.getUserById);
router.put("/updateUser/:id", authMiddleware_1.default, userController_1.default.updateUser);
router.delete("/deleteUser/:id", authMiddleware_1.default, userController_1.default.deleteUser);
exports.default = router;
