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

module.exports = { createSubject };
