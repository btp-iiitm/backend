const Student = require("../models/student");
const Exam = require("../models/exam");
const StudentExam = require("../models/studentExam");
const AppError = require("../utils/appError");

const linkStudentExam = async (req, res, next) => {
  try {
    const { studentId, examId } = req.body;

    const student = await Student.findById(studentId);
    const exam = await Exam.findById(examId);

    const studentExamExists = await StudentExam.findOne({
      studentId,
      examId,
    });

    if (studentExamExists)
      return next(new AppError("Student already evaluated", 400));

    if (!student || !exam)
      return next(new AppError("Student or Exam not found", 404));

    if (student.course.toString() !== exam.courseId.toString())
      return next(
        new AppError("Student and Exam are not in the same course", 400),
      );

    const studentExam = await StudentExam.create(req.body);

    res.status(201).json({
      status: "success",
      studentExam,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentExams = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const studentId = student._id;

    const studentExams = await StudentExam.find({ studentId }).select(
      "-__v -studentId -createdAt -_id",
    );

    res.status(200).json({
      status: "success",
      results: studentExams.length,
      studentExams,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentExamsByInstituteID = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      instituteId: req.params.instituteId,
    });

    if (!student) return next(new AppError("Student not found", 404));

    const studentId = student._id;

    const studentExams = await StudentExam.find({ studentId }).select(
      "-__v -studentId -createdAt -_id",
    );

    res.status(200).json({
      status: "success",
      results: studentExams.length,
      studentExams,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  linkStudentExam,
  getStudentExams,
  getStudentExamsByInstituteID,
};
