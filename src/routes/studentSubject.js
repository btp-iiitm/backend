const express = require("express");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { linkStudentSubject } = require("../controllers/studentSubject");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, linkStudentSubject);

module.exports = router;
