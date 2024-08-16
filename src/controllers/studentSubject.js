const fs = require("fs");
const { parse } = require("csv-parse");

const Student = require("../models/student");
const Subject = require("../models/subject");
const StudentSubject = require("../models/studentSubject");
const AppError = require("../utils/appError");

const linkStudentSubject = async (req, res, next) => {
  try {
    const { studentId, subjectId } = req.body;

    const student = await Student.findById(studentId);
    const subject = await Subject.findById(subjectId);

    const studentSubjectExists = await StudentSubject.findOne({
      studentId,
      subjectId,
    });

    if (studentSubjectExists)
      return next(new AppError("Student already evaluated", 400));

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

const linkStudentSubjectFromCSV = async (req, res, next) => {
  try {
    const links = [];

    const parser = fs
      .createReadStream(req.file.path)
      .pipe(parse({ columns: true }));

    for await (const row of parser) {
      const { studentId, subjectId } = row;

      const student = await Student.findById(studentId);
      const subject = await Subject.findById(subjectId);

      const studentSubjectExists = await StudentSubject.findOne({
        studentId,
        subjectId,
      });

      if (studentSubjectExists)
        return next(new AppError("Student already evaluated", 400));

      if (!student || !subject)
        return next(new AppError("Student or Subject not found", 404));

      if (student.course.toString() !== subject.courseId.toString())
        return next(
          new AppError("Student and Subject are not in the same course", 400),
        );

      links.push({
        studentId: row.studentId,
        subjectId: row.subjectId,
        totalClassesAttended: parseInt(row.totalClassesAttended, 10),
      });
    }

    const createdLinks = await StudentSubject.insertMany(links);

    res.status(201).json({
      status: "success",
      links: createdLinks,
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

const getStudentSubjectsByInstituteID = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      instituteId: req.params.instituteId,
    });

    if (!student) return next(new AppError("Student not found", 404));

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

module.exports = {
  linkStudentSubject,
  linkStudentSubjectFromCSV,
  getStudentSubjects,
  getStudentSubjectsByInstituteID,
};
