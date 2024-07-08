const express = require("express");
const { createCourse } = require("../controllers/course");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, createCourse);

module.exports = router;
