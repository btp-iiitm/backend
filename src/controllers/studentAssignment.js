const Student = require("../models/student");
const Assignment = require("../models/assignment");
const StudentAssignment = require("../models/studentAssignment");
const AppError = require("../utils/appError");

const linkStudentAssignment = async (req, res, next) => {
  try {
    const { studentId, assignmentId } = req.body;

    const student = await Student.findById(studentId);
    const assignment = await Assignment.findById(assignmentId);

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

module.exports = { linkStudentAssignment };
