const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  createAssignment,
  getAllCourseAssignments,
  getAllCourseAssignmentsByInstituteID,
} = require("../controllers/assignment");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createAssignment)
  .get(protect, getAllCourseAssignments);

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getAllCourseAssignmentsByInstituteID);

module.exports = router;
