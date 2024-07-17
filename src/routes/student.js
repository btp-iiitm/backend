const express = require("express");
const {
  createStudent,
  getStudent,
  getAllStudents,
  getStudentByInstituteID,
} = require("../controllers/student");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createStudent)
  .get(protect, getStudent);

router.route("/all").get(protect, isAdminOrSuperAdmin, getAllStudents);

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getStudentByInstituteID);

module.exports = router;
