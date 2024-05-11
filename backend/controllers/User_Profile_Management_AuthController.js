const User = require("../modules/User_Profile_Management_UserModel");
const Otp = require("../modules/User_Profile_Management_OTPModal");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Email and Password Required!");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User Not Found");
    }
    if (password !== user.password) {
      throw new Error("Invalid Password");
    }
    if (role !== user.role) {
      throw new Error("Invalid Role");
    }

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: createSendToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signToken = (email, role) => {
  return jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user) => {
  user.password = undefined;

  const token = signToken(user.email, user.role);
  const role = user.role;
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return {
    status: "success",
    token,
    role,
    cookieOptions,
  };
};

//decode token
const decode = (token) => {
  const tokenWithoutBearer = token.split(" ")[1];
  const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
  return decoded;
};

//current user
const currentUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Please Login First");
    }
    const decoded = decode(token);
    console.log(decoded);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      throw new Error("User Not Found");
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//email send with token
const sendTokenVerify = async (req, res) => {
  const { email } = req.params;
  try {
    //check user
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Not Found");
    }
    const otp = Math.floor(10000 + Math.random() * 90000);

    const otpNumber = new Otp({
      email: email,
      otp: otp,
    });
    const savedOtp = await otpNumber.save();
    await sendEmail(email, "Reset Password OTP", otp.toString());
    res.status(200).json({ message: "sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//otp confirmation
const otpVerify = async (req, res) => {
  const { email, otp } = req.body;
  try {
    console.log(email, otp);
    const otpCheck = await Otp.find({ email: email, otp: otp });
    console.log(otpCheck);
    if (otpCheck.length === 0) {
      throw new Error("Invalid OTP");
    }
    const deleteOTP = await Otp.findOneAndDelete({ email: email, otp: otp });
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: "1234" }
    );
    res.status(200).json({
      status: "success",
      message:
        "OTP Verified Successfully. Your password is 1234. Change this after Login!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//logout
const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      message: "logged Out!",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  loginUser,
  logout,
  currentUser,
  sendTokenVerify,
  otpVerify,
};
