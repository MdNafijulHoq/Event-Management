const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const { EncodeToken } = require("../utility/TokenHelper.js");

const UserSignUp = async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Valid email address required",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "fail",
        message: "Strong password required",
      });
    }
    //  Check if user already exist
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({
        status: "fail",
        message: `${email} already exist`,
      });
    }
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // Create new user object
    const newUser = UserModel({
      name,
      email,
      password: hashPassword,
      profilePic,
    });
    // Generate Token
    let token = EncodeToken(newUser.email, newUser._id, res);
    if (!token) {
      return res.status(400).json({
        status: "fail",
        message: "Token generated failed",
      });
    }
    // Save user to database
    const data = await newUser.save();
    // remove password from user data
    const { password: _, ...UserData } = data.toObject();
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      token: token,
      data: UserData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const UserSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Credentials",
      });
    }
    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Credentials",
      });
    }
    // Generate Token
    let token = EncodeToken(user.email, user._id, res);
    if (!token) {
      return res.status(400).json({
        status: "fail",
        message: "Token generated failed",
      });
    }
    // Respond with user data excluding password
    const { password: _, ...userData } = user.toObject();
    return res.status(200).json({
      status: "success",
      message: "User LogIn successful",
      token: token,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const CheckingLoggedInUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      status: "success",
      message: "User is Logged In",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const UserLogOut = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ status: "success", message: "Logout Success" });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const userprofile = async (req, res) => {
  try {
    res.status(200).json({ status: "success", message: "profile read" });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  UserSignUp,
  UserSignIn,
  CheckingLoggedInUser,
  UserLogOut,
  userprofile,
};
