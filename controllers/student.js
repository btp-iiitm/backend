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
      data: {
        student,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createStudent };
