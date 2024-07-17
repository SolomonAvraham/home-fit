import User from "./User";
import Workout from "./Workout";
import Exercise from "./Exercise";
import Progress from "./Progress";
import Notification from "./Notification";
import sequelize from "../config/database";
import Workout_exercises from "./Workout_exercises";

User.associate({
  Workout,
  Progress,
  Notification,
});

Workout.associate({
  User,
  Notification,
  Exercise,
  Workout_exercises,
});

Exercise.associate({
  Workout,
  Workout_exercises,
});

Progress.associate({
  User,
  Workout,
});

Notification.associate({
  User,
});

 

export {
  sequelize,
  User,
  Workout,
  Exercise,
  Progress,
  Notification,
  Workout_exercises,
};
