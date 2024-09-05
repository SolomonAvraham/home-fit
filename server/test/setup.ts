import { before, after } from "mocha";
import sequelize from "../src/config/database";

before(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ force: true });
    console.log("Database synchronized and reset.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
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
