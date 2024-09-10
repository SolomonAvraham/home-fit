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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
const uuid_1 = require("uuid");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.email || !req.body.password || !req.body.name) {
                    res.status(400).json({ message: "All fields are required" });
                }
                const user = yield userService_1.default.createUser(req.body);
                res.cookie("token", user.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });
                const { token } = user, userData = __rest(user, ["token"]);
                res.status(201).json(userData);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                console.error(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { id, name, role, token } = yield userService_1.default.authenticateUser(email, password);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });
                res.status(200).json({ id, name, role });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(401).json({ message: error.message });
                }
                console.error(error);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("token", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    expires: new Date(0),
                });
                res.status(200).json({ message: "Logout successful" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                console.error(error);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (!(0, uuid_1.validate)(userId)) {
                res.status(400).json({ message: "Invalid UUID format" });
            }
            try {
                const user = yield userService_1.default.getUserById(userId);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                console.error(error);
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.default.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                console.error(error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!(0, uuid_1.validate)(data.id)) {
                res.status(400).json({ message: "Invalid UUID format" });
                return;
            }
            try {
                const updatedUser = yield userService_1.default.updateUser(data.id, data);
                res.json(updatedUser);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                console.error(error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(0, uuid_1.validate)(id)) {
                res.status(400).json({ message: "Invalid UUID format" });
                return;
            }
            try {
                const deleted = yield userService_1.default.deleteUser(id);
                if (deleted === 0) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                if (res) {
                    res.clearCookie("token");
                }
                res.status(204).json();
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Delete user error:", error.message, error.stack); // Added logging
                    res.status(400).json({ message: error.message });
                }
                console.error(error);
            }
        });
    }
}
exports.default = new UserController();
