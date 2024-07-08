const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  linkStudentQuiz,
  getStudentQuizzes,
} = require("../controllers/studentQuiz");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, linkStudentQuiz)
  .get(protect, getStudentQuizzes);

module.exports = router;
