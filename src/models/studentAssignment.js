const mongoose = require("mongoose");

const studentAssignmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "A student assignment must have a student ID"],
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [true, "A student assignment must have a assignment ID"],
  },
  marksObtained: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

studentAssignmentSchema.index({ studentId: 1, subjectId: 1 }, { unique: true });

const StudentAssignment = mongoose.model(
  "StudentAssignment",
  studentAssignmentSchema,
);

module.exports = StudentAssignment;
