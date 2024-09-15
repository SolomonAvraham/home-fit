import express, { Application, Request, Response } from "express";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import { userRoute, workoutRoute, exerciseRoutes } from "./routes/index";
import "./models/index";
import cors from "cors";
import testRoutes from "./routes/testRoutes";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
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

app.get("/api/verifyToken", (req, res) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json(false);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return res.status(401).json(false);
    }

    return res.status(200).json(true);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

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
