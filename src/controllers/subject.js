const Subject = require("../models/subject");

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
    const { courseId } = req.query;

    if (!courseId) return next(new AppError("Course ID is required", 400));

    const subjects = await Subject.find({ courseId })
    .select("-__v -courseId -createdAt -_id");

    res.status(200).json({
      status: "success",
      results: subjects.length,
      subjects,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSubject, getAllCourseSubjects };
