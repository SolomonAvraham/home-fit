import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { id, name, role, token } = await UserService.authenticateUser(
        email,
        password
      );
      res.status(200).json({ id, name, role, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    // if (!userId.match(/^[0-9a-fA-F-]{36}$/)) {
    //   console.log("Invalid user ID format");
    // }
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(userId)) {
      console.log("Invalid user ID format");
    }
    try {
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const data = req.body;

    try {
      const updatedUser = await UserService.updateUser(userId, data);
      res.json(updatedUser);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedRows = await UserService.deleteUser( req.params.id);
      if (deletedRows > 0) {
        res.status(200).json({ message: "User deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
