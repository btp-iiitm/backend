const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { linkStudentAssignment } = require("../controllers/studentAssignment");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, linkStudentAssignment);

module.exports = router;
