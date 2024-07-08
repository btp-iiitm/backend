const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { createExam } = require("../controllers/exam");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, createExam);

module.exports = router;
