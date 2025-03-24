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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
// **Get All Users**
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.UserModel.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        next(err); // Pass error to Express error handler
    }
});
exports.getAllUsers = getAllUsers;
// **Get User by ID**
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.UserModel.getUserById(req.params.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserById = getUserById;
// **Create New User**
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userModel_1.UserModel.createUser(req.body);
        res.status(201).json({ message: "User created", user: newUser });
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
// **Update User**
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userModel_1.UserModel.updateUser(req.params.id, req.body);
        if (!updatedUser)
            return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User updated", user: updatedUser });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
// **Delete User**
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield userModel_1.UserModel.deleteUser(req.params.id);
        if (!deletedUser)
            return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted", user: deletedUser });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
