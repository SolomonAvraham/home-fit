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
class UserService {
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.email || !data.password || !data.name || !data.role) {
                throw new Error("All fields are required");
            }
            const existingUser = yield User_1.default.findOne({ where: { email: data.email } });
            if (existingUser) {
                throw new Error("Email already exists");
            }
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            const user = yield User_1.default.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            return { id: user.id, name: user.name, email: user.email, role: user.role };
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            // Check if the user exists
            const user = yield User_1.default.findByPk(id);
            if (!user) {
                console.log("User not found");
                throw new Error("User not found");
            }
            // Update the user
            const [updatedCount, updatedUsers] = yield User_1.default.update(data, {
                where: { id },
                returning: true,
            });
            if (updatedCount === 0) {
                console.log("Update failed");
                throw new Error("Update failed");
            }
            return updatedUsers[0];
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.destroy({ where: { id } });
        });
    }
    static authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
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
