const Student = require("../models/student");
const Subject = require("../models/subject");
const AppError = require("../utils/appError");

const createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      status: "success",
      subject,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourseSubjects = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const courseId = student.course;

    const subjects = await Subject.find({ courseId }).select(
      "-__v -courseId -createdAt",
    );

    res.status(200).json({
      status: "success",
      results: subjects.length,
      subjects,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourseSubjectsByInstituteID = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      instituteId: req.params.instituteId,
    });

    if (!student) return next(new AppError("Student not found", 404));

    const courseId = student.course;

    const subjects = await Subject.find({ courseId }).select(
      "-__v -courseId -createdAt",
    );

    res.status(200).json({
      status: "success",
      results: subjects.length,
      subjects,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubject,
  getAllCourseSubjects,
  getAllCourseSubjectsByInstituteID,
};
