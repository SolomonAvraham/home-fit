"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const index_1 = require("../models/index");
class UserService {
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.email || !data.password || !data.name) {
                throw new Error("All fields are required");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                throw new Error("Invalid email format");
            }
            const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
            if (!passwordRegex.test(data.password)) {
                throw new Error("Password must be at least 8 characters long and include at least one letter");
            }
            const nameRegex = /^[a-zA-Z ]{2,30}$/;
            if (!nameRegex.test(data.name)) {
                throw new Error("Name must be between 2 and 30 characters and contain only letters and spaces");
            }
            const existingUser = yield User_1.default.findOne({ where: { email: data.email } });
            if (existingUser) {
                throw new Error("Email already exists");
            }
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            const user = yield User_1.default.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            };
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id)) {
                throw new Error("Invalid UUID format");
            }
            const user = yield User_1.default.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findAll();
        });
    }
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id)) {
                throw new Error("Invalid UUID format");
            }
            const user = yield User_1.default.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }
            return yield user.update(data);
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id)) {
                throw new Error("Invalid UUID format");
            }
            const transaction = yield index_1.sequelize.transaction();
            try {
                const user = yield User_1.default.findByPk(id, { transaction });
                if (!user) {
                    yield transaction.rollback();
                    return 0; // Returning 0 to indicate no user was found
                }
                // Delete related records
                yield index_1.Workout.destroy({ where: { userId: id }, transaction });
                yield index_1.Progress.destroy({ where: { userId: id }, transaction });
                yield index_1.Notification.destroy({ where: { userId: id }, transaction });
                yield user.destroy({ transaction });
                yield transaction.commit();
                return 1; // Returning 1 to indicate user was deleted
            }
            catch (error) {
                yield transaction.rollback();
                console.error("Error in deleteUser service method:", error.message, error.stack); // Added logging
                throw new Error("Failed to delete user");
            }
        });
    }
    static authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new Error("All fields are required");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format");
            }
            const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error("Password must be at least 8 characters long and include at least one letter");
            }
            const user = yield User_1.default.findOne({ where: { email } });
            if (!user)
                throw new Error("User not found");
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid password");
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            };
        });
    }
}
exports.default = UserService;
