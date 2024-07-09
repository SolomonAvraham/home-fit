import { User, Workout, Progress, Notification, Exercise } from "../../models";

export default interface Models {
  User: typeof User;
  Workout: typeof Workout;
  Progress: typeof Progress;
  Notification: typeof Notification;
  Exercise: typeof Exercise;
}
