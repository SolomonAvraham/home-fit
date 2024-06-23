// test/setup.ts
import { before, after } from "mocha";
import sequelize from "../src/config/database";
import { up as userSeederUp } from "../seeders/20240620192611-demo-user";
import { up as workoutPlanSeederUp } from "../seeders/20240620192744-demo-workout-plan";

before(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync();
    console.log("Database synchronized.");

    await userSeederUp({} as any);
    await workoutPlanSeederUp({} as any);
    console.log("Dummy data inserted.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error; // Rethrow error to fail the setup
  }
});

after(async () => {
  try {
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error during teardown:", error);
  }
});
