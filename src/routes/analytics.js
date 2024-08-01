const express = require("express");

const { protect } = require("../middleware/protected");
const { getAnalytics } = require("../controllers/analytics");

const router = express.Router();

router.route("/").get(protect, getAnalytics);

module.exports = router;
