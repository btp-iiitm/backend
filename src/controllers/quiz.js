const Quiz = require("../models/quiz");
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
    const { courseId } = req.query;

    if (!courseId) return next(new AppError("Course ID is required", 400));

    const quizzes = await Quiz.find({ courseId })
      .populate({ path: "subjectId", select: "-__v -courseId -createdAt -_id" })
      .select("-__v -courseId -createdAt -_id");

    res.status(200).json({
      status: "success",
      results: quizzes.length,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createQuiz, getAllCourseQuizzes };
