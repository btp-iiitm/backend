const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "An exam must have a course ID"],
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "An exam must have a subject ID"],
  },
  name: {
    type: String,
    required: [true, "An exam must have a name"],
  },
  description: {
    type: String,
    required: [true, "An exam must have a description"],
  },
  maximumMarks: {
    type: Number,
    required: [true, "An exam must have maximum marks"],
  },
  passingMarks: {
    type: Number,
    required: [true, "A quiz must have passing marks"],
  },
  date: {
    type: Date,
    required: [true, "An exam must have a date"],
  },
  timeAllowed: {
    type: Number,
    required: [true, "An exam must have time allowed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
