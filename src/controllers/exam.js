const Exam = require("../models/exam");
const Student = require("../models/student");

const createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);

    res.status(201).json({
      status: "success",
      exam,
    });
  } catch (error) {
    next(error);
  }
};
const getAllCourseExam = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const courseId = student.course;

    const exams = await Exam.find({ courseId })
      .populate({ path: "subjectId", select: "-__v -courseId -createdAt -_id" })
      .select("-__v -courseId -createdAt");

    res.status(200).json({
      status: "success",
      results: exams.length,
      exams,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExam, getAllCourseExam };
