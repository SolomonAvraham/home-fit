import { v4 as uuidv4 } from "uuid";
import User from "../../src/models/User";
import Workout from "../../src/models/Workout";
import WorkoutPlan from "../../src/models/WorkoutPlan";
import Progress from "../../src/models/Progress";
import Notification from "../../src/models/Notification";

let testUserId: string;
let testWorkoutPlanId: string;
let testWorkoutId: string;
let testProgressId: string;
let testNotificationId: string;
const testuidv4 = uuidv4();

export const createTestEntities = async () => {
  await User.sync({ force: true });
  await WorkoutPlan.sync({ force: true });
  await Workout.sync({ force: true });
  await Progress.sync({ force: true });
  await Notification.sync({ force: true });

  const user = await User.create({
    id: testuidv4,
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  });
  testUserId = user.id;

  const workoutPlan = await WorkoutPlan.create({
    id: uuidv4(),
    userId: testUserId,
    name: "Test Workout Plan",
    description: "Test Description",
  });
  testWorkoutPlanId = workoutPlan.id;

  const workout = await Workout.create({
    id: uuidv4(),
    userId: testUserId,
    workoutPlanId: testWorkoutPlanId,
    date: new Date(),
    duration: 60,
  });
  testWorkoutId = workout.id;

  const progress = await Progress.create({
    id: uuidv4(),
    userId: testUserId,
    workoutId: testWorkoutId,
    date: new Date(),
    performanceMetrics: {},
  });
  testProgressId = progress.id;

  const notification = await Notification.create({
    id: uuidv4(),
    userId: testUserId,
    message: "Test Notification",
    read: false,
  });
  testNotificationId = notification.id;
};

export const cleanupTestEntities = async () => {
  await Notification.destroy({ where: {} });
  await Progress.destroy({ where: {} });
  await Workout.destroy({ where: {} });
  await WorkoutPlan.destroy({ where: {} });
  await User.destroy({ where: {} });
};

export {
  testUserId,
  testWorkoutPlanId,
  testWorkoutId,
  testProgressId,
  testNotificationId,
  testuidv4,
};
