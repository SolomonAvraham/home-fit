import User, { UserCreationAttributes } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validate as validateUUID } from "uuid";
import { Exercise, Workout, sequelize } from "../models/index";

class UserService {
  public static async createUser(data: UserCreationAttributes) {
    if (!data.email || !data.password || !data.name) {
      throw new Error("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }

    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      throw new Error(
        "Password must be at least 8 characters long and include at least one letter"
      );
    }

    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (!nameRegex.test(data.name)) {
      throw new Error(
        "Name must be between 2 and 30 characters and contain only letters and spaces"
      );
    }

    const existingUser = await User.findOne({ where: { email: data.email } });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      ...data,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
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

  public static async getUserById(id: string) {
    if (!validateUUID(id)) {
      throw new Error("Invalid UUID format");
    }

    const user = await User.findByPk(id);

    const exercisesCount = await Exercise.count({
      where: { userId: id },
    });

    const workoutCount = await Workout.count({
      where: { userId: id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id,
      name: user.name,
      email: user.email,
      exercisesCount,
      workoutCount,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
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

    const isEmailExists = await User.findOne({ where: { email: data.email } });

    if (isEmailExists && isEmailExists.id !== id) {
      throw new Error("Email already exists");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }

    const nameRegex = /^[a-zA-Z ]{2,30}$/;

    if (!nameRegex.test(data.name)) {
      throw new Error(
        "Name must be between 2 and 30 characters and contain only letters and spaces"
      );
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
        return 0;
      }

      await Workout.destroy({ where: { userId: id }, transaction });
      await Exercise.destroy({ where: { userId: id }, transaction });

      await user.destroy({ transaction });
      await transaction.commit();

      
      return 1;
    } catch (error: any) {
      await transaction.rollback();
      console.error(error);
      throw new Error(error.message);
    }
  }

  public static async authenticateUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must be at least 8 characters long and include at least one letter"
      );
    }

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
