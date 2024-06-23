import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validate as validateUUID } from "uuid";
import { Progress, Workout, sequelize, Notification } from "../models";

interface UserData {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

class UserService {
  public static async createUser(data: UserData) {
    if (!data.email || !data.password || !data.name) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  public static async getUserById(id: string) {
    if (!validateUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  public static async getAllUsers() {
    return User.findAll();
  }

  public static async updateUser(id: string, data: any) {
    if (!validateUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.update(data);
  }

  public static async deleteUser(id: string) {
    if (!validateUUID(id)) {
      throw new Error("Invalid UUID format");
    }
    const transaction = await sequelize.transaction();
    try {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        await transaction.rollback();
        return 0; // Returning 0 to indicate no user was found
      }
      // Delete related records
      await Workout.destroy({ where: { userId: id }, transaction });
      await Progress.destroy({ where: { userId: id }, transaction });
      await Notification.destroy({ where: { userId: id }, transaction });

      await user.destroy({ transaction });
      await transaction.commit();
      return 1; // Returning 1 to indicate user was deleted
    } catch (error: any) {
      await transaction.rollback();
      console.error(
        "Error in deleteUser service method:",
        error.message,
        error.stack
      ); // Added logging
      throw new Error("Failed to delete user");
    }
  }

  public static async authenticateUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}

export default UserService;