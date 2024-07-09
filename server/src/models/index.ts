import User from "./User";
import Workout from "./Workout";
import Exercise from "./Exercise";
import Progress from "./Progress";
import Notification from "./Notification";
import sequelize from "../config/database";

User.associate({ User, Workout, Progress, Notification, Exercise });
Workout.associate({ User, Workout, Progress, Notification, Exercise });
Progress.associate({ User, Workout, Progress, Notification, Exercise });
Notification.associate({ User, Workout, Progress, Notification, Exercise });
Exercise.associate({ User, Workout, Progress, Notification, Exercise });

export { sequelize, User, Workout, Exercise, Progress, Notification };
