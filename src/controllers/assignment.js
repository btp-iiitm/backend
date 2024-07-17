const Student = require("../models/student");
const Assignment = require("../models/assignment");
const AppError = require("../utils/appError");

const createAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.create(req.body);

    res.status(201).json({
      status: "success",
      assignment,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourseAssignments = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const courseId = student.course;

    const assignments = await Assignment.find({ courseId })
      .populate({ path: "subjectId", select: "-__v -courseId -createdAt -_id" })
      .select("-__v -courseId -createdAt");

    res.status(200).json({
      status: "success",
      results: assignments.length,
      assignments,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourseAssignmentsByInstituteID = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      instituteId: req.params.instituteId,
    });

    if (!student) return next(new AppError("Student not found", 404));

    const courseId = student.course;

    const assignments = await Assignment.find({
      courseId,
    })
      .populate({ path: "subjectId", select: "-__v -courseId -createdAt -_id" })
      .select("-__v -courseId -createdAt");

    res.status(200).json({
      status: "success",
      results: assignments.length,
      assignments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAssignment,
  getAllCourseAssignments,
  getAllCourseAssignmentsByInstituteID,
};
