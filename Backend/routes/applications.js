const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const SchoolFeesApplication = require("../models/SchoolFeesApplication");
const TravelExpensesApplication = require("../models/TravelExpensesApplication");
const StudyBooksApplication = require("../models/StudyBooksApplication");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user.id;
    const dir = `./uploads/${userId}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only .jpeg, .jpg, .png, .pdf files are allowed");
    }
  },
});

// School Fees Application
const schoolFeesUpload = upload.fields([
  { name: "birthCertificate", maxCount: 1 },
  { name: "leavingCertificate", maxCount: 1 },
  { name: "marksheet", maxCount: 1 },
  { name: "admissionProof", maxCount: 1 },
  { name: "incomeProof", maxCount: 1 },
  { name: "bankAccount", maxCount: 1 },
  { name: "rationCard", maxCount: 1 },
]);

router.post("/school-fees", auth, schoolFeesUpload, async (req, res) => {
  try {
    const fileFields = {};

    // Process uploaded files
    if (req.files) {
      Object.keys(req.files).forEach((fieldName) => {
        const file = req.files[fieldName][0];
        fileFields[fieldName] = `/uploads/${req.user.id}/${file.filename}`;
      });
    }

    const newApplication = new SchoolFeesApplication({
      user: req.user.id,
      applicationType: "schoolFees",
      ...fileFields,
    });

    await newApplication.save();
    res.json({
      success: true,
      msg: "School fees application submitted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Travel Expenses Application
const travelExpensesUpload = upload.fields([{ name: "idCard", maxCount: 1 }]);

router.post(
  "/travel-expenses",
  auth,
  travelExpensesUpload,
  async (req, res) => {
    try {
      let idCardPath = "";

      // Process uploaded ID card
      if (req.files && req.files.idCard) {
        const file = req.files.idCard[0];
        idCardPath = `/uploads/${req.user.id}/${file.filename}`;
      }

      const newApplication = new TravelExpensesApplication({
        user: req.user.id,
        applicationType: "travelExpenses",
        residencePlace: req.body.residencePlace,
        destinationPlace: req.body.destinationPlace,
        distance: req.body.distance,
        travelMode: req.body.travelMode,
        aidRequired: req.body.aidRequired,
        idCard: idCardPath,
      });

      await newApplication.save();
      res.json({
        success: true,
        msg: "Travel expenses application submitted successfully",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Study Books Application
router.post("/study-books", auth, async (req, res) => {
  try {
    const newApplication = new StudyBooksApplication({
      user: req.user.id,
      applicationType: "studyBooks",
      yearOfStudy: req.body.yearOfStudy,
      field: req.body.field,
      booksRequired: req.body.booksRequired,
    });

    await newApplication.save();
    res.json({
      success: true,
      msg: "Study books application submitted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
