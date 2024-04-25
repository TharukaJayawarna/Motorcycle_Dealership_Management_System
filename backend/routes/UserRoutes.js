const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");

router
  .route("/")
  .post(userController.registerUser)
  .get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
