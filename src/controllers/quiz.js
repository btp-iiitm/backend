const Quiz = require("../models/quiz");
const Student = require("../models/student");
const AppError = require("../utils/appError");

const createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      status: "success",
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourseQuizzes = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const courseId = student.course;

    const quizzes = await Quiz.find({ courseId })
      .populate({ path: "subjectId", select: "-__v -courseId -createdAt -_id" })
      .select("-__v -courseId -createdAt");

    res.status(200).json({
      status: "success",
      results: quizzes.length,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourseQuizzesByInstituteID = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      instituteId: req.params.instituteId,
    });

    if (!student) return next(new AppError("Student not found", 404));

    const courseId = student.course;

    const quizzes = await Quiz.find({
      courseId,
    })
      .populate({ path: "subjectId", select: "-__v -courseId -createdAt -_id" })
      .select("-__v -courseId -createdAt");

    res.status(200).json({
      status: "success",
      results: quizzes.length,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  getAllCourseQuizzes,
  getAllCourseQuizzesByInstituteID,
};
