const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  createSubject,
  getAllCourseSubjects,
} = require("../controllers/subject");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createSubject)
  .get(protect, getAllCourseSubjects);

module.exports = router;
