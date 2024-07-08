const express = require("express");
const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const { createSubject } = require("../controllers/subject");

const router = express.Router();

router.route("/").post(protect, isAdminOrSuperAdmin, createSubject);

module.exports = router;
