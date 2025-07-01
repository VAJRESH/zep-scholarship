const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const User = require("../models/User");
const StudentRegistration = require("../models/StudentRegistration");
const SchoolFeesApplication = require("../models/SchoolFeesApplication");
const TravelExpensesApplication = require("../models/TravelExpensesApplication");
const StudyBooksApplication = require("../models/StudyBooksApplication");
const PDFDocument = require("pdfkit");

// GET /api/admin/users
// Get all users for admin dashboard
router.get("/users", [auth, adminAuth], async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/admin/users/:id
// Get a specific user's registration details
router.get("/users/:id", [auth, adminAuth], async (req, res) => {
  try {
    const registration = await StudentRegistration.findOne({
      user: req.params.id,
    });
    if (!registration) {
      return res.status(404).json({ msg: "Registration not found" });
    }
    res.json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/admin/users/:id/applications
// Get all applications from a specific user
router.get("/users/:id/applications", [auth, adminAuth], async (req, res) => {
  try {
    // Get user's ID from params
    const userId = req.params.id;

    // Fetch applications from all three collections
    const schoolFeesApps = await SchoolFeesApplication.find({ user: userId });
    const travelExpensesApps = await TravelExpensesApplication.find({
      user: userId,
    });
    const studyBooksApps = await StudyBooksApplication.find({ user: userId });

    // Combine all applications
    const allApplications = [
      ...schoolFeesApps,
      ...travelExpensesApps,
      ...studyBooksApps,
    ];

    // Sort by creation date (newest first)
    allApplications.sort((a, b) => b.createdAt - a.createdAt);

    res.json(allApplications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Approve School Fees Application
router.post("/approve/school-fees/:id", [auth, adminAuth], async (req, res) => {
  try {
    const app = await SchoolFeesApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ msg: "Application not found" });
    app.status = "approved";
    await app.save();
    res.json({ success: true, msg: "School fees application approved." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Approve Travel Expenses Application
router.post(
  "/approve/travel-expenses/:id",
  [auth, adminAuth],
  async (req, res) => {
    try {
      const app = await TravelExpensesApplication.findById(req.params.id);
      if (!app) return res.status(404).json({ msg: "Application not found" });
      app.status = "approved";
      await app.save();
      res.json({ success: true, msg: "Travel expenses application approved." });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Approve Study Books Application
router.post("/approve/study-books/:id", [auth, adminAuth], async (req, res) => {
  try {
    const app = await StudyBooksApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ msg: "Application not found" });
    app.status = "approved";
    await app.save();
    res.json({ success: true, msg: "Study books application approved." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Download Study Books Application as PDF
router.get("/download/study-books/:id", [auth, adminAuth], async (req, res) => {
  try {
    const app = await StudyBooksApplication.findById(req.params.id).populate(
      "user"
    );
    if (!app) return res.status(404).json({ msg: "Application not found" });
    const registration = await StudentRegistration.findOne({
      user: app.user._id,
    });
    if (!registration)
      return res.status(404).json({ msg: "Student registration not found" });

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=study-books-application-${app._id}.pdf`
    );
    doc.pipe(res);

    // Header
    doc
      .fontSize(24)
      .font("Times-Bold")
      .text("Vivekanand Seva Mandal", { align: "center" })
      .moveDown(0.2);
    doc
      .fontSize(18)
      .font("Times-Bold")
      .text("Study Books Scholarship Application", { align: "center" })
      .moveDown(1);

    // Draw a line below the header
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Student Details Section
    doc
      .fontSize(14)
      .font("Times-Bold")
      .text("Student Details", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).font("Times-Roman");

    // Two-column layout for student details with dynamic y-positioning to avoid overlap
    const leftColX = 50;
    const rightColX = 300;
    let y = doc.y;
    const rowHeight = 20;
    // Left column fields
    const leftFields = [
      ["Academic Year:", registration.academicYear || ""],
      ["Date:", registration.date ? registration.date.toDateString() : ""],
      ["College Name:", registration.collegeName || ""],
      ["Course Name:", registration.courseName || ""],
      ["Applicant Name:", registration.applicantName || ""],
      ["Mother's Name:", registration.motherName || ""],
      ["Address:", registration.address || ""],
    ];
    // Right column fields
    const rightFields = [
      ["DOB:", registration.dob ? registration.dob.toDateString() : ""],
      ["Gender:", registration.gender || ""],
      ["Caste:", registration.caste || ""],
      ["State:", registration.state || ""],
      ["Orphan:", registration.orphan ? "Yes" : "No"],
      ["Disabled:", registration.disabled ? "Yes" : "No"],
    ];
    // Print left column
    let leftY = y;
    leftFields.forEach(([label, value]) => {
      doc.font("Times-Bold").text(label, leftColX, leftY, { continued: true });
      doc.font("Times-Roman").text(` ${value}`, { width: 200 });
      leftY = doc.y + 2; // move to next line after wrapped text
    });
    // Print right column, aligning with left column's starting y
    let rightY = y;
    rightFields.forEach(([label, value]) => {
      doc
        .font("Times-Bold")
        .text(label, rightColX, rightY, { continued: true });
      doc.font("Times-Roman").text(` ${value}`, { width: 180 });
      rightY = doc.y + 2;
    });
    // Move down to the lower of the two columns
    doc.y = Math.max(leftY, rightY) + 10;

    // Book Request Details Section
    doc
      .fontSize(14)
      .font("Times-Bold")
      .text("Book Request Details", leftColX, doc.y, { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12);
    let bookY = doc.y;
    doc.font("Times-Bold").text("Year of Study:", leftColX, bookY);
    doc.font("Times-Roman").text(app.yearOfStudy, leftColX + 120, bookY);
    doc.font("Times-Bold").text("Field:", leftColX, bookY + rowHeight);
    doc.font("Times-Roman").text(app.field, leftColX + 120, bookY + rowHeight);
    doc
      .font("Times-Bold")
      .text("Books Required:", leftColX, bookY + rowHeight * 2, {
        continued: false,
      });
    // Parse booksRequired string and print each book as 'Book Name - Type' (no brackets, keep 'jn' in book name)
    let booksRequiredClean = app.booksRequired
      .split(",")
      .map((b) => {
        let match = b.match(/(.+?)\s*\((Textbook|Guide)\)/i);
        if (match) {
          let name = match[1].trim(); // keep full book name, including 'jn' if present
          let type = match[2];
          return `${name} - ${type}`;
        } else {
          return b.trim();
        }
      })
      .join("\n");
    doc
      .font("Times-Roman")
      .text(booksRequiredClean, leftColX + 120, bookY + rowHeight * 2, {
        width: 400,
      });
    doc.moveDown(3);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message || "Server error" });
  }
});

module.exports = router;
