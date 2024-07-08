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

module.exports = { createAssignment };
