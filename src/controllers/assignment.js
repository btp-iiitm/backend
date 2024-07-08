const Assignment = require("../models/assignment");

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
    const { courseId } = req.query;

    if (!courseId) return next(new AppError("Course ID is required", 400));

    const assignments = await Assignment.find({ courseId })
      .populate({ path: "subjectId", select: "-__v -courseId -createdAt -_id" })
      .select("-__v -courseId -createdAt -_id");

    res.status(200).json({
      status: "success",
      results: assignments.length,
      assignments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAssignment, getAllCourseAssignments };
