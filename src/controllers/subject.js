const fs = require("fs");
const { parse } = require("csv-parse");

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

const createSubjectsFromCSV = async (req, res, next) => {
  try {
    const subjects = [];

    const parser = fs
      .createReadStream(req.file.path)
      .pipe(parse({ columns: true }));

    for await (const row of parser) {
      subjects.push({
        courseId: row.courseId,
        subjectCode: row.subjectCode,
        name: row.name,
        description: row.description,
        totalClasses: parseInt(row.totalClasses, 10),
      });
    }

    const createdSubjects = await Subject.insertMany(subjects);

    res.status(201).json({
      status: "success",
      subjects: createdSubjects,
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
  createSubjectsFromCSV,
  getAllCourseSubjects,
  getAllCourseSubjectsByInstituteID,
};
