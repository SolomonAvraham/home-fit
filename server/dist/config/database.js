"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URL = process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL;
if (!DB_URL) {
    throw new Error("No database URL found");
}
const sequelize = new sequelize_1.Sequelize(DB_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
});
exports.default = sequelize;
