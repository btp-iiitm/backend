const Student = require("../models/student");
const Subject = require("../models/subject");
const StudentSubject = require("../models/studentSubject");
const AppError = require("../utils/appError");

const linkStudentSubject = async (req, res, next) => {
  try {
    const { studentId, subjectId } = req.body;

    const student = await Student.findById(studentId);
    const subject = await Subject.findById(subjectId);

    if (!student || !subject)
      return next(new AppError("Student or Subject not found", 404));

    if (student.course.toString() !== subject.courseId.toString())
      return next(
        new AppError("Student and Subject are not in the same course", 400),
      );

    const studentSubject = await StudentSubject.create(req.body);

    res.status(201).json({
      status: "success",
      studentSubject,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { linkStudentSubject };
