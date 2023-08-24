// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create a new user
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashPassword,
    });
    req.session.user = newUser;

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "An error occurred while creating the user.",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Simulate a delay of 5 seconds (5000 milliseconds)
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    console.log("INSTANCE TEST");
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
        message: "Login successful",
        user,
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "An error occurred while logging in.",
      error,
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log("INSTANCE TESTING");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("An error occurred while fetching users.");
  }
};

// ... Implement other CRUD operations (update, delete, get by ID) similarly
