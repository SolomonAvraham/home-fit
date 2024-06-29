// test/unit/services/userService.spec.ts
import { expect } from "chai";
import UserService from "../../../src/services/userService";
import User from "../../../src/models/User";
import sequelize from "../../../src/config/database";
import bcrypt from "bcryptjs";
import { before, describe, it } from "mocha";

describe("UserService Unit Tests", () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await User.destroy({ where: {} }); // Clear the table before each test
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      const user = await UserService.createUser(userData);

      expect(user).to.have.property("id");
      expect(user).to.have.property("name", "Test User");
      expect(user).to.have.property("email", "testuser@example.com");

      const createdUser = await User.findOne({
        where: { email: "testuser@example.com" },
      });
      expect(createdUser).to.not.be.null;
      const isPasswordValid = await bcrypt.compare(
        userData.password,
        createdUser!.password
      );
      expect(isPasswordValid).to.be.true;
    });

    it("should throw an error if email already exists", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      await UserService.createUser(userData);

      try {
        await UserService.createUser(userData);
      } catch (error: any) {
        expect(error.message).to.equal("Email already exists");
      }
    });

    it("should throw an error if fields are missing", async () => {
      const userData = {
        name: "",
        email: "",
        password: "",
      };

      try {
        await UserService.createUser(userData);
      } catch (error: any) {
        expect(error.message).to.equal("All fields are required");
      }
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      const createdUser = await UserService.createUser(userData);

      const user = await UserService.getUserById(createdUser.id);

      expect(user).to.have.property("id", createdUser.id);
      expect(user).to.have.property("name", createdUser.name);
      expect(user).to.have.property("email", createdUser.email);
    });

    it("should throw an error if user is not found", async () => {
      const nonExistentId = "d6b836a7-8af2-4736-9f3e-3344e71563cf"; // Use a valid UUID format

      try {
        await UserService.getUserById(nonExistentId);
      } catch (error: any) {
        expect(error.message).to.equal("User not found");
      }
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const userData1 = {
        name: "Test User one",
        email: "testuser1@example.com",
        password: "password123",
      };
      const userData2 = {
        name: "Test User two",
        email: "testuser2@example.com",
        password: "password123",
      };

      await UserService.createUser(userData1);
      await UserService.createUser(userData2);

      const users = await UserService.getAllUsers();

      expect(users).to.be.an("array");
      expect(users.length).to.equal(2);
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      const createdUser = await UserService.createUser(userData);

      const updatedUser = await UserService.updateUser(createdUser.id, {
        name: "Updated User",
      });

      expect(updatedUser).to.have.property("name", "Updated User");
    });

    it("should throw an error if user is not found", async () => {
      const nonExistentId = "d6b836a7-8af2-4736-9f3e-3344e71563cf"; // Use a valid UUID format

      try {
        await UserService.updateUser(nonExistentId, { name: "Updated Name" });
      } catch (error: any) {
        expect(error.message).to.equal("User not found");
      }
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      const createdUser = await UserService.createUser(userData);

      const deleteCount = await UserService.deleteUser(createdUser.id);

      expect(deleteCount).to.equal(1);
    });

    it("should return 0 if user is not found", async () => {
      const nonExistentId = "d6b836a7-8af2-4736-9f3e-3344e71563cf"; // Use a valid UUID format

      const result = await UserService.deleteUser(nonExistentId);
      expect(result).to.equal(0);
    });
  });

  describe("authenticateUser", () => {
    it("should authenticate a user and return a token", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      await UserService.createUser(userData);

      const result = await UserService.authenticateUser(
        userData.email,
        userData.password
      );

      expect(result).to.have.property("token");
      expect(result).to.have.property("email", userData.email);
    });

    it("should throw an error if email is not found", async () => {
      try {
        await UserService.authenticateUser(
          "non-existent@example.com",
          "password123"
        );
      } catch (error: any) {
        expect(error.message).to.equal("User not found");
      }
    });

    it("should throw an error if password is incorrect", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      await UserService.createUser(userData);

      try {
        await UserService.authenticateUser(userData.email, "wrongpassword");
      } catch (error: any) {
        expect(error.message).to.equal("Invalid password");
      }
    });
  });
});
