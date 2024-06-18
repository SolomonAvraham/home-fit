import User from "./User";
import Workout from "./Workout";
import WorkoutPlan from "./WorkoutPlan";
import Exercise from "./Exercise";
import Progress from "./Progress";
import Notification from "./Notification";
import sequelize from "../config/database";

User.associate();
Workout.associate();
WorkoutPlan.associate();
Exercise.associate();
Progress.associate();
Notification.associate();

export {
  sequelize,
  User,
  Workout,
  WorkoutPlan,
  Exercise,
  Progress,
  Notification,
};
