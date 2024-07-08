const Student = require("../models/student");
const Quiz = require("../models/quiz");
const StudentQuiz = require("../models/studentQuiz");
const AppError = require("../utils/appError");

const linkStudentQuiz = async (req, res, next) => {
  try {
    const { studentId, quizId } = req.body;

    const student = await Student.findById(studentId);
    const quiz = await Quiz.findById(quizId);

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

module.exports = { linkStudentQuiz };
