const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  linkStudentAssignment,
  getStudentAssignments,
  getStudentAssignmentsByInstituteID,
} = require("../controllers/studentAssignment");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, linkStudentAssignment)
  .get(protect, getStudentAssignments);

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getStudentAssignmentsByInstituteID);

module.exports = router;
