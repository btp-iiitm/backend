const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  linkStudentQuiz,
  getStudentQuizzes,
  getStudentQuizzesByInstituteID,
} = require("../controllers/studentQuiz");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, linkStudentQuiz)
  .get(protect, getStudentQuizzes);

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getStudentQuizzesByInstituteID);

module.exports = router;
