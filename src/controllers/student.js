const User = require("../models/user");
const Student = require("../models/student");
const AppError = require("../utils/appError");

const createStudent = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return next(new AppError("User not found, please ask to signup", 404));

    const student = await Student.create({ ...req.body, userId: user._id });

    res.status(201).json({
      status: "success",
      student,
    });
  } catch (error) {
    next(error);
  }
};

const getStudent = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) return next(new AppError("Please provide email", 400));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("User not found with this email", 404));

    const student = await Student.findOne({ userId: user._id }).populate({
      path: "course",
      select: "-createdAt -__v",
    });
    if (!student)
      return next(
        new AppError("Student not found with this email, contack admin", 404),
      );

    let response = {};
    const excludedFieldsUser = ["_id", "__v", "createdAt"];
    const excludedFieldsStudent = ["_id", "__v", "userId", "createdAt"];

    Object.keys(user._doc).forEach((key) => {
      if (!excludedFieldsUser.includes(key)) response[key] = user[key];
    });

    Object.keys(student._doc).forEach((key) => {
      if (!excludedFieldsStudent.includes(key)) response[key] = student[key];
    });

    res.status(200).json({
      status: "success",
      student: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createStudent, getStudent };
