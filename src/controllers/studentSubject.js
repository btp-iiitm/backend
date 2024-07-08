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

const getStudentSubjects = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const studentId = student._id;

    const studentSubjects = await StudentSubject.find({ studentId }).select(
      "-__v -studentId -createdAt -_id",
    );

    res.status(200).json({
      status: "success",
      results: studentSubjects.length,
      studentSubjects,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { linkStudentSubject, getStudentSubjects };
