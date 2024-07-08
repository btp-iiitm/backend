const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { createQuiz, getAllCourseQuizzes } = require("../controllers/quiz");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createQuiz)
  .get(protect, getAllCourseQuizzes);

module.exports = router;
