const jwt = require("jsonwebtoken");

const User = require("../models/user");
const AppError = require("../utils/appError");

const signup = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body, role: "user" });

    res.status(201).json({
      status: "success",
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Please provide email and password", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password)))
      return next(new AppError("Incorrect email or password", 401));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
