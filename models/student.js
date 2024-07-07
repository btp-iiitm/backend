const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A student must have a user ID"],
    unique: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "A student must have a course"],
  },
  courseStartDate: {
    type: Date,
    required: [true, "A course must have a start date for a student."],
  },
  courseEndDate: {
    type: Date,
    required: [true, "A course must have an end date for a student."],
  },
  instituteId: {
    type: String,
    required: [true, "A student must have an institute ID"],
  },
  gender: {
    type: String,
    required: [true, "A student must select this field"],
  },
  phone: {
    type: String,
    required: [true, "A student must have a phone number"],
    unique: true,
  },
  fatherName: {
    type: String,
    required: [true, "A student must have a father's name"],
  },
  motherName: {
    type: String,
    required: [true, "A student must have a mother's name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
