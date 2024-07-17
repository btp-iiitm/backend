const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  createSubject,
  getAllCourseSubjects,
  getAllCourseSubjectsByInstituteID,
} = require("../controllers/subject");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createSubject)
  .get(protect, getAllCourseSubjects);

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getAllCourseSubjectsByInstituteID);

module.exports = router;
