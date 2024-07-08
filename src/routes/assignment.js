const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { createAssignment } = require("../controllers/assignment");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, createAssignment);

module.exports = router;
