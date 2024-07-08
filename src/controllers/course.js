const Course = require("../models/course");

const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCourse };
