"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Define routes with correct typing
router.get("/", asyncHandler(userController_1.getAllUsers));
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Fetches user details based on their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user.
 *       404:
 *         description: User not found.
 */
router.get("/:id", asyncHandler(userController_1.getUserById));
router.post("/", asyncHandler(userController_1.createUser));
router.put("/:id", asyncHandler(userController_1.updateUser));
router.delete("/:id", asyncHandler(userController_1.deleteUser));
exports.default = router;
