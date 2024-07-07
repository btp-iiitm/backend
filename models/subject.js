const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "A subject must have a course ID"],
  },
  subjectCode: {
    type: String,
    required: [true, "A subject must have a code"],
  },
  name: {
    type: String,
    required: [true, "A subject must have a name"],
  },
  description: {
    type: String,
    required: [true, "A subject must have a description"],
  },
  totalClasses: {
    type: Number,
    required: [true, "A subject must have total classes"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
