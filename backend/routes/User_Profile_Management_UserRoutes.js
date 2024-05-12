const express = require("express");
const router = express.Router();
const userController = require("../controllers/User_Profile_Management_UserController");

// Routes for registering a new user and getting all users
router.route("/")
  .post(userController.registerUser)
  .get(userController.getAllUsers);

// Route for getting total number of users


// Routes for getting a specific user by ID, updating, and deleting
router.route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
