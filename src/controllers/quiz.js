const Quiz = require("../models/quiz");

const createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      status: "success",
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createQuiz };
