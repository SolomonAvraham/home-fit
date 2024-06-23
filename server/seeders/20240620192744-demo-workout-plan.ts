// seeders/20210620000001-demo-workout-plan.ts
import { QueryInterface } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
  return queryInterface.bulkInsert("WorkoutPlans", [
    {
      name: "Workout Plan 1",
      description: "This is workout plan 1",
      userId: "user-id-1", // Use the actual user ID from the Users table
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Workout Plan 2",
      description: "This is workout plan 2",
      userId: "user-id-2", // Use the actual user ID from the Users table
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = (queryInterface: QueryInterface) => {
  return queryInterface.bulkDelete("WorkoutPlans", {}, {});
};
