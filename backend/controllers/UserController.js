const User = require("../modules/UserModel");

//add a user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) throw new Error("User already exists");

    const newUser = await new User({
      name,
      email,
      password,
      role,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User Not found!");
    }
    res.status(200).json({
      status: "success",
      message: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User Not found!");
    }
    const userUpdate = await User.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ message: `User ${user.email} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      throw new Error("User Not found!");
    }
    res
      .status(200)
      .json({ message: `User ${user.email} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
