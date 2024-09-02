import User from "./User";
import Workout from "./Workout";
import Exercise from "./Exercise";
import sequelize from "../config/database";
import Workout_exercises from "./Workout_exercises";
import ScheduledWorkout from "./ScheduledWorkout";

User.associate({
  Workout,
  Exercise,
  ScheduledWorkout,
});

Workout.associate({
  User,
  Exercise,
  Workout_exercises,
  ScheduledWorkout,
});

Exercise.associate({
  User,
  Workout,
  Workout_exercises,
});

ScheduledWorkout.associate({
  User,
  Workout,
});

export {
  sequelize,
  User,
  Workout,
  Exercise,
  Workout_exercises,
  ScheduledWorkout,
};
