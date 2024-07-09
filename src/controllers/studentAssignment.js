const Student = require("../models/student");
const Assignment = require("../models/assignment");
const StudentAssignment = require("../models/studentAssignment");
const AppError = require("../utils/appError");

const linkStudentAssignment = async (req, res, next) => {
  try {
    const { studentId, assignmentId } = req.body;

    const student = await Student.findById(studentId);
    const assignment = await Assignment.findById(assignmentId);

    const studentAssignmentExists = await StudentAssignment.findOne({
      studentId,
      assignmentId,
    });

    if (studentAssignmentExists)
      return next(new AppError("Student already evaluated", 400));

    if (!student || !assignment)
      return next(new AppError("Student or Assignment not found", 404));

    if (student.course.toString() !== assignment.courseId.toString())
      return next(
        new AppError("Student and Assignment are not in the same course", 400),
      );

    const studentAssignment = await StudentAssignment.create(req.body);

    res.status(201).json({
      status: "success",
      studentAssignment,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentAssignments = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const studentId = student._id;

    const studentAssignments = await StudentAssignment.find({
      studentId,
    }).select("-__v -studentId -createdAt -_id");

    res.status(200).json({
      status: "success",
      results: studentAssignments.length,
      studentAssignments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { linkStudentAssignment, getStudentAssignments };
