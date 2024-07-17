const Student = require("../models/student");
const Quiz = require("../models/quiz");
const StudentQuiz = require("../models/studentQuiz");
const AppError = require("../utils/appError");

const linkStudentQuiz = async (req, res, next) => {
  try {
    const { studentId, quizId } = req.body;

    const student = await Student.findById(studentId);
    const quiz = await Quiz.findById(quizId);

    const studentQuizExists = await StudentQuiz.findOne({
      studentId,
      quizId,
    });

    if (studentQuizExists)
      return next(new AppError("Student already evaluated", 400));

    if (!student || !quiz)
      return next(new AppError("Student or Quiz not found", 404));

    if (student.course.toString() !== quiz.courseId.toString())
      return next(
        new AppError("Student and Quiz are not in the same course", 400),
      );

    const studentQuiz = await StudentQuiz.create(req.body);

    res.status(201).json({
      status: "success",
      studentQuiz,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentQuizzes = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const studentId = student._id;

    const studentQuizzes = await StudentQuiz.find({ studentId }).select(
      "-__v -studentId -createdAt -_id",
    );

    res.status(200).json({
      status: "success",
      results: studentQuizzes.length,
      studentQuizzes,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentQuizzesByInstituteID = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      instituteId: req.params.instituteId,
    });

    if (!student) return next(new AppError("Student not found", 404));

    const studentId = student._id;

    const studentQuizzes = await StudentQuiz.find({ studentId }).select(
      "-__v -studentId -createdAt -_id",
    );

    res.status(200).json({
      status: "success",
      results: studentQuizzes.length,
      studentQuizzes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  linkStudentQuiz,
  getStudentQuizzes,
  getStudentQuizzesByInstituteID,
};
