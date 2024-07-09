import express, { Application, Request, Response } from "express";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import {
  userRoute,
  workoutRoute,
  progressRoutes,
  notificationRoutes,
   exerciseRoutes,
} from "./routes/index";
import "../src/models/index";
import cors from "cors";
import testRoutes from "./routes/testRoutes";

const app: Application = express();
const PORT = process.env.PORT || 9000;

const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.use("/api/test", testRoutes);
app.use(errorMiddleware);
  
app.use("/api/workouts", workoutRoute);
app.use("/api/progress", progressRoutes);
app.use("/api/notifications", notificationRoutes);
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
