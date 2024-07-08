const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  linkStudentSubject,
  getStudentSubjects,
} = require("../controllers/studentSubject");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, linkStudentSubject)
  .get(protect, getStudentSubjects);

module.exports = router;
