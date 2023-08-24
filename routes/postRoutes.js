// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
const protect = require("../middleware/authMiddleware");

// Create a new post
router.post("/posts", protect, postController.createPost);

// Get all users
router.get("/posts", postController.getAllPosts);

// ... Define other routes (update, delete, get by ID) similarly
router.get("/posts/:id", postController.getPostById);
router.delete("/posts/:id", postController.deletePost);
router.put("/posts/:id", postController.updatePost);
module.exports = router;
