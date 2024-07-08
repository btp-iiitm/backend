const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { createQuiz } = require("../controllers/quiz");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, createQuiz);

module.exports = router;
