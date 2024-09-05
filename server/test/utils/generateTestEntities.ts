import { v4 as uuidv4 } from "uuid";
import User from "../../src/models/User";
import Workout from "../../src/models/Workout";
import { Exercise } from "../../src/models";

let testUserId: string;
let testNewUserId: string;
let testWorkoutId: string;
let testExerciseId: string;

const testuidv4 = uuidv4();
const testNewUseruidv4 = uuidv4();
const testWorkoutUidv4 = uuidv4();
const testExerciseUidv4 = uuidv4();

export const createTestEntities = async () => {
  await User.sync({ force: true });
  await Workout.sync({ force: true });
  await Exercise.sync({ force: true });

  const user = await User.create({
    id: testuidv4,
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  });

  testUserId = user.id;

  const newUser = await User.create({
    id: testNewUseruidv4,
    name: "Test User",
    email: "testnewuser@example.com",
    password: "password123",
  });

  testNewUserId = newUser.id;

  const workout = await Workout.create({
    id: testWorkoutUidv4,
    userId: testUserId,
    name: "Test Workout",
    description: "This is a test workout",
    createdBy: [
      {
        creatorId: testUserId,
        creatorName: user.name,
        originalWorkoutId: testWorkoutUidv4,
      },
    ],
  });

  testWorkoutId = workout.id;

  const exercise = await Exercise.create({
    id: testExerciseUidv4,
    userId: testUserId,
    name: "Test Exercise",
    description: "This is a test exercise",
    sets: 3,
    reps: 10,
    duration: 30,
    media: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdBy: [
      {
        creatorId: testUserId,
        creatorName: "Test Exercise",
        originalExerciseId: testExerciseUidv4,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  testExerciseId = exercise.id;
};

export const cleanupTestEntities = async () => {
  await Exercise.destroy({ where: {} });
  await Workout.destroy({ where: {} });
  await User.destroy({ where: {} });
};

export { testUserId, testWorkoutId, testuidv4, testExerciseId, testNewUserId };
