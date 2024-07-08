const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { linkStudentExam } = require("../controllers/studentExam");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, linkStudentExam);

module.exports = router;
