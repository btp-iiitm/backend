const express = require("express");
const multer = require("multer");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  createSubject,
  createSubjectsFromCSV,
  getAllCourseSubjects,
  getAllCourseSubjectsByInstituteID,
} = require("../controllers/subject");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, createSubject)
  .get(protect, getAllCourseSubjects);

router
  .route("/upload-csv")
  .post(
    protect,
    isAdminOrSuperAdmin,
    upload.single("file"),
    createSubjectsFromCSV,
  );

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getAllCourseSubjectsByInstituteID);

module.exports = router;
