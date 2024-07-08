const mongoose = require("mongoose");

const studentSubjectSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "A student subject must have a student ID"],
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "A student subject must have a subject ID"],
  },
  totalClassesAttended: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

studentSubjectSchema.index({ studentId: 1, subjectId: 1 }, { unique: true });

const StudentSubject = mongoose.model("StudentSubject", studentSubjectSchema);

module.exports = StudentSubject;
