const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "An assignment must have a course ID"],
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "An assignment must have a subject ID"],
  },
  name: {
    type: String,
    required: [true, "An assignment must have a name"],
  },
  description: {
    type: String,
    required: [true, "An assignment must have a description"],
  },
  maximumMarks: {
    type: Number,
    required: [true, "An assignment must have maximum marks"],
  },
  deadline: {
    type: Date,
    required: [true, "An assignment must have a deadline"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
