// seeders/20240620192611-demo-user.ts
import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";

export const up = async (queryInterface: QueryInterface) => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  return queryInterface.bulkInsert("Users", [
    {
      name: "Test User 1",
      email: "test1@example.com",
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Test User 2",
      email: "test2@example.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = (queryInterface: QueryInterface) => {
  return queryInterface.bulkDelete("Users", {}, {});
};
