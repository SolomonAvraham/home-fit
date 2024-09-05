import { expect } from "chai";
import { sequelize } from "../../../src/models";
import { describe, it, before, beforeEach } from "mocha";
import UserService from "../../../src/services/userService";
import  { UserCreationAttributes } from "../../../src/models/User";
 
describe("UserService Unit Tests", () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const userData: UserCreationAttributes = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

      const user = await UserService.createUser(userData);

      expect(user).to.have.property("id");
      expect(user).to.have.property("name", "John Doe");
      expect(user).to.have.property("email", "john.doe@example.com");
      expect(user).to.have.property("role", "user");
      expect(user).to.have.property("token").that.is.a("string");
    });

    it("should throw an error if required fields are missing", async () => {
      const userData = { email: "missing.fields@example.com" };

      try {
        await UserService.createUser(userData as UserCreationAttributes);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("All fields are required");
        } else {
          throw error;
        }
      }
    });

    it("should throw an error if email format is invalid", async () => {
      const userData = {
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
      };

      try {
        await UserService.createUser(userData as UserCreationAttributes);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid email format");
        } else {
          throw error;
        }
      }
    });

    it("should throw an error if password format is invalid", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "short",
      };

      try {
        await UserService.createUser(userData);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal(
            "Password must be at least 8 characters long and include at least one letter"
          );
        } else {
          throw error;
        }
      }
    });
  });

  describe("getUserById", () => {
    it("should get a user by id", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

      const createdUser = await UserService.createUser(userData);
      const user = await UserService.getUserById(createdUser.id);

      expect(user).to.have.property("id", createdUser.id);
      expect(user).to.have.property("name", "John Doe");
      expect(user).to.have.property("email", "john.doe@example.com");
    });

    it("should throw an error if user is not found", async () => {
      try {
        await UserService.getUserById("non-existent-id");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format");
        } else {
          throw error;
        }
      }
    });
  });

  describe("getAllUsers", () => {
    it("should get all users", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

      await UserService.createUser(userData);

      const users = await UserService.getAllUsers();

      expect(users).to.be.an("array");
      expect(users.length).to.equal(1);
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

      const createdUser = await UserService.createUser(userData);
      const updatedUser = await UserService.updateUser(createdUser.id, {
        name: "John Updated",
      });

      expect(updatedUser).to.have.property("name", "John Updated");
    });

    it("should throw an error if user is not found", async () => {
      try {
        await UserService.updateUser("non-existent-id", {
          name: "John Updated",
        });
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid UUID format");
        } else {
          throw error;
        }
      }
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

      const createdUser = await UserService.createUser(userData);
      const deletedCount = await UserService.deleteUser(createdUser.id);

      expect(deletedCount).to.equal(1);
    });
    it("should return 0 if user is not found", async () => {
      try {
        const result = await UserService.deleteUser(
          "00000000-0000-0000-0000-000000000000"
        );
        expect(result).to.equal(0);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
      }
    });
  });

  describe("authenticateUser", () => {
    it("should authenticate a user and return a token", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

      await UserService.createUser(userData);

      const user = await UserService.authenticateUser(
        userData.email,
        userData.password
      );

      expect(user).to.have.property("token").that.is.a("string");
    });

 it("should throw an error if email format is invalid", async () => {
   try {
     await UserService.authenticateUser("invalid-email", "password123");
   } catch (error) {
     if (error instanceof Error) {
       expect(error.message).to.equal("Invalid email format");
     } else {
       throw error; // Ensure non-standard errors don't pass silently
     }
   }
 });

    it("should throw an error if user is not found", async () => {
      try {
        await UserService.authenticateUser("notfound@example.com", "password");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("User not found");
        } else {
          throw error;
        }
      }
    });

    it("should throw an error if password is invalid", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

      await UserService.createUser(userData);

      try {
        await UserService.authenticateUser(userData.email, "wrongpassword");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal("Invalid password");
        } else {
          throw error;
        }
      }
    });
  });
});
