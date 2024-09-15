import { Request, Response } from "express";
import UserService from "../services/userService";
import { validate as validateUUID } from "uuid";

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.email || !req.body.password || !req.body.name) {
        res.status(400).json({ message: "All fields are required" });
      }

      const user = await UserService.createUser(req.body);

      res.cookie("token", user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      });

      const { ...userData } = user;

      res.status(201).json(userData);
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
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

      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        expires: expires,
        domain: ".homefit-pro.vercel.app",
      });

      res.status(200).json({ id, name, role });
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      }
      console.error(error);
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      console.error(error);
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    if (!validateUUID(userId)) {
      res.status(400).json({ message: "Invalid UUID format" });
    }
    try {
      const user = await UserService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      console.error(error);
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      console.error(error);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const data = req.body;

    if (!validateUUID(data.id)) {
      res.status(400).json({ message: "Invalid UUID format" });
      return;
    }

    try {
      const updatedUser = await UserService.updateUser(data.id, data);
      res.json(updatedUser);
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      console.error(error);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid UUID format" });
      return;
    }
    try {
      const deleted = await UserService.deleteUser(id);
      if (deleted === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (res) {
        res.clearCookie("token");
      }

      res.status(204).json();
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Delete user error:", error.message, error.stack); // Added logging
        res.status(400).json({ message: error.message });
      }
      console.error(error);
    }
  }
}

export default new UserController();
