const mongoose = require("mongoose");

const studentQuizSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "A student quiz must have a student ID"],
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: [true, "A student quiz must have a quiz ID"],
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

studentQuizSchema.index({ studentId: 1, quizId: 1 }, { unique: true });

const StudentQuiz = mongoose.model("StudentQuiz", studentQuizSchema);

module.exports = StudentQuiz;
