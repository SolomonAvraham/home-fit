"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const index_1 = require("./routes/index");
require("../src/models/index");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use("/api/users", index_1.userRoute);
app.use("/api/workouts", index_1.workoutRoute);
app.use("/api/progress", index_1.progressRoutes);
app.use("/api/notifications", index_1.notificationRoutes);
app.use("/api/workout-plans", index_1.workoutPlanRoutes);
app.use("/api/exercises", index_1.exerciseRoutes);
app.use(errorMiddleware_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log("Database connected successfully.");
        yield database_1.default.sync();
        console.log("Database synchronized.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
startServer();
exports.default = app;
