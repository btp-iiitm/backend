const express = require("express");
const { createStudent } = require("../controllers/student");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, createStudent);

module.exports = router;
