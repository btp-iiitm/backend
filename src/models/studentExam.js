const mongoose = require("mongoose");

const studentExamSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "A student exam must have a student ID"],
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: [true, "A student exam must have a exam ID"],
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

studentExamSchema.index({ studentId: 1, subjectId: 1 }, { unique: true });

const StudentExam = mongoose.model("StudentExam", studentExamSchema);

module.exports = StudentExam;
