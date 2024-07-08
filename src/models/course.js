const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A course must have a name"],
  },
  description: {
    type: String,
    required: [true, "A course must have a description"],
  },
  duration: {
    type: Number,
    required: [true, "A course must have a duration in months"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
