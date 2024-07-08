const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { linkStudentQuiz } = require("../controllers/studentQuiz");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, linkStudentQuiz);

module.exports = router;
