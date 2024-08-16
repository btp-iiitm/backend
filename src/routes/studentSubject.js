const express = require("express");
const multer = require("multer");

const { protect } = require("../middleware/protected");
const { isAdminOrSuperAdmin } = require("../middleware/admin");
const {
  linkStudentSubject,
  linkStudentSubjectFromCSV,
  getStudentSubjects,
  getStudentSubjectsByInstituteID,
} = require("../controllers/studentSubject");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .post(protect, isAdminOrSuperAdmin, linkStudentSubject)
  .get(protect, getStudentSubjects);

router
  .route("/upload-csv")
  .post(
    protect,
    isAdminOrSuperAdmin,
    upload.single("file"),
    linkStudentSubjectFromCSV,
  );

router
  .route("/:instituteId")
  .get(protect, isAdminOrSuperAdmin, getStudentSubjectsByInstituteID);

module.exports = router;
