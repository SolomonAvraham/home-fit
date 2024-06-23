import express, { Application, Request, Response } from "express";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import {
  userRoute,
  workoutRoute,
  progressRoutes,
  notificationRoutes,
  workoutPlanRoutes,
  exerciseRoutes,
  testRoute,
  errorRoute,
} from "./routes/index";
import "../src/models/index";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/workouts", workoutRoute);
app.use("/api/progress", progressRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/workout-plans", workoutPlanRoutes);
app.use("/api/exercises", exerciseRoutes);

app.use("/api/test", testRoute);
app.use("/api/test", errorRoute);

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync();
    console.log("Database synchronized.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

export default app;
