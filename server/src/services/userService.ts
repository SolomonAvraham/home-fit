import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserData {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

class UserService {
  public static async createUser(data: UserData) {
    if (!data.email || !data.password || !data.name || !data.role) {
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
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  public static async getAllUsers() {
    return User.findAll();
  }

  public static async updateUser(id: string, data: Partial<User>) {
    // Check if the user exists
    const user = await User.findByPk(id);
    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }

    // Update the user
    const [updatedCount, updatedUsers] = await User.update(data, {
      where: { id },
      returning: true,
    });

    if (updatedCount === 0) {
      console.log("Update failed");
      throw new Error("Update failed");
    }

    return updatedUsers[0];
  }

  public static async deleteUser(id: string) {
    return User.destroy({ where: { id } });
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
