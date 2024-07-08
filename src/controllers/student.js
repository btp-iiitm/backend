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
    const student = await Student.findOne({ userId: req.user._id })
      .select("-_id -createdAt -__v")
      .populate([
        {
          path: "course",
          select: "-createdAt -__v -_id",
        },
        {
          path: "userId",
          select: "-createdAt -__v -_id",
        },
      ]);

    if (!student)
      return next(
        new AppError("Student not found with this email, contack admin", 404),
      );

    res.status(200).json({
      status: "success",
      student,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createStudent, getStudent };
