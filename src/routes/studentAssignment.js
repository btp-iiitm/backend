const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  linkStudentAssignment,
  getStudentAssignments,
} = require("../controllers/studentAssignment");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, linkStudentAssignment)
  .get(protect, getStudentAssignments);

module.exports = router;
