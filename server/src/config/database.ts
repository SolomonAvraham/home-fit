import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_URL =
process.env.NODE_ENV === "test"
? process.env.DATABASE_URL_TEST
: process.env.DATABASE_URL;

 if (!DB_URL) {
  throw new Error("No database URL found");
}

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
});

export default sequelize;
