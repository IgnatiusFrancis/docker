// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Get all users
router.get("/users", userController.getAllUsers);

// ... Define other routes (update, delete, get by ID) similarly

module.exports = router;
