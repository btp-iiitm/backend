const Exam = require("../models/exam");

const createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);

    res.status(201).json({
      status: "success",
      exam,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExam };
