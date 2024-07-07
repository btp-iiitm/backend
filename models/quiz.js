const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "A quiz must have a course ID"],
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "An exam must have a subject ID"],
  },
  date: {
    type: Date,
    required: [true, "A quiz must have a date"],
  },
  startTime: {
    type: Date,
    required: [true, "A quiz must have a start time"],
  },
  endTime: {
    type: Date,
    required: [true, "A quiz must have an end time"],
  },
  maximumMarks: {
    type: Number,
    required: [true, "A quiz must have maximum marks"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
