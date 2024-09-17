import express, { Application, Request, Response } from "express";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import { userRoute, workoutRoute, exerciseRoutes } from "./routes/index";
import "./models/index";
import cors from "cors";
import testRoutes from "./routes/testRoutes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 9001;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://homefit-pro.vercel.app"
        : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", userRoute);

app.use("/api/test", testRoutes);
app.use(errorMiddleware);

app.use("/api/workouts", workoutRoute);
app.use("/api/exercises", exerciseRoutes);

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
