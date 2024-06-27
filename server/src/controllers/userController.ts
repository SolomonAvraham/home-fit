import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body);

      res.cookie("token", user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      const { token, ...userData } = user;

      res.status(201).json(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.error(error);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const { id, name, role, token } = await UserService.authenticateUser(
        email,
        password
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({ id, name, role });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      }
      console.error(error);
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
      });

      res.status(200).json({ message: "Logout successful" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.error(error);
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(userId)) {
      res.status(400).json({ message: "Invalid UUID format" });
      return;
    }
    try {
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.error(error);
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.error(error);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const data = req.body;
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(userId)) {
      res.status(400).json({ message: "Invalid UUID format" });
      return;
    }
    try {
      const updatedUser = await UserService.updateUser(userId, data);
      res.json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      console.error(error);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
      res.status(400).json({ message: "Invalid UUID format" });
      return;
    }
    try {
      const deleted = await UserService.deleteUser(id);
      if (deleted === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(204).json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Delete user error:", error.message, error.stack); // Added logging
        res.status(400).json({ error: error.message });
      }
      console.error(error);
    }
  }
}

export default new UserController();
