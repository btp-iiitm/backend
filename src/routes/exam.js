const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  createExam,
  getAllCourseExam,
  getAllCourseExamByInstituteID,
} = require("../controllers/exam");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createExam)
  .get(protect, getAllCourseExam);

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getAllCourseExamByInstituteID);

module.exports = router;
