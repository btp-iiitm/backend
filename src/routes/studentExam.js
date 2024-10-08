const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  linkStudentExam,
  getStudentExams,
  getStudentExamsByInstituteID,
} = require("../controllers/studentExam");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, linkStudentExam)
  .get(protect, getStudentExams);

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getStudentExamsByInstituteID);

module.exports = router;
