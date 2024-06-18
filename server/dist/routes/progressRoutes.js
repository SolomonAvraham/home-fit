"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const progressController_1 = __importDefault(require("../controllers/progressController"));
const router = (0, express_1.Router)();
router.post("/", progressController_1.default.createProgress);
router.get("/all", progressController_1.default.getAllProgress);
router.get("/:id", progressController_1.default.getProgressById);
router.put("/:id", progressController_1.default.updateProgress);
router.delete("/:id", progressController_1.default.deleteProgress);
exports.default = router;
