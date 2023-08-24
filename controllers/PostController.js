// controllers/userController.js
const Post = require("../models/PostModel");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Handle validation errors
      const errorMessages = error.errors.map((err) => err.message);
      res.status(400).json({ errors: errorMessages });
    } else {
      console.error("Error creating post:", error);
      res.status(500).send("An error occurred while creating the post.");
    }
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    if (!posts || posts.length === 0) {
      res.status(404).send("No posts found.");
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("An error occurred while fetching posts.");
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).send("Post not found.");
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).send("An error occurred while fetching post by ID.");
  }
};

// Update post by ID
exports.updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const [updatedRowsCount, updatedRows] = await Post.update(req.body, {
      where: { id: postId },
      returning: true, // Return the updated post
    });
    console.log(updatedRowsCount, updatedRows);

    if (updatedRowsCount === 0) {
      res.status(404).send("Post not found.");
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("An error occurred while updating the post.");
  }
};

// Delete post by ID
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedRowCount = await Post.destroy({
      where: { id: postId },
    });

    if (deletedRowCount === 0) {
      res.status(404).send("Post not found.");
    } else {
      res.status(200).json({ Deleted: "Successfully" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("An error occurred while deleting the post.");
  }
};
