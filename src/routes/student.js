const express = require("express");
const { createStudent, getStudent } = require("../controllers/student");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");

const router = express.Router();

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createStudent)
  .get(protect, getStudent);

module.exports = router;
