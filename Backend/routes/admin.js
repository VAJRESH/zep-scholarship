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
    // Fetch application and registration data
    const app = await StudyBooksApplication.findById(req.params.id).populate(
      "user"
    );
    if (!app) return res.status(404).json({ msg: "Application not found" });
    const registration = await StudentRegistration.findOne({
      user: app.user._id,
    });
    if (!registration)
      return res.status(404).json({ msg: "Student registration not found" });

    // Initialize PDF with options
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      info: {
        Title: `Study Books Application - ${app._id}`,
        Author: "Vivekanand Seva Mandal",
      },
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=study-books-application-${app._id}.pdf`
    );
    doc.pipe(res);

    // Helper function to draw a horizontal line
    const drawLine = (y, xStart = 40, xEnd = 555) => {
      doc.moveTo(xStart, y).lineTo(xEnd, y).lineWidth(1).stroke();
    };

    // Header Section
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#003087")
      .text("Vivekanand Seva Mandal", { align: "center" })
      .moveDown(0.3);
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Study Books Scholarship Application", { align: "center" })
      .moveDown(0.5);
    drawLine(doc.y + 10);
    doc.moveDown(1);

    // Student Details Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Student Details", 40, doc.y, { underline: true })
      .moveDown(0.5);

    // Table-like layout for student details
    const tableTop = doc.y;
    const col1X = 40;
    const col2X = 200;
    const col3X = 350;
    const rowHeight = 20;
    const labelWidth = 150;
    const valueWidth = 150;

    // Define student details fields
    const studentFields = [
      ["Academic Year", registration.academicYear || "N/A"],
      ["Date", registration.date ? registration.date.toDateString() : "N/A"],
      ["Applicant Name", registration.applicantName || "N/A"],
      ["Mother's Name", registration.motherName || "N/A"],
      ["DOB", registration.dob ? registration.dob.toDateString() : "N/A"],
      ["Gender", registration.gender || "N/A"],
      ["Caste", registration.caste || "N/A"],
      ["College Name", registration.collegeName || "N/A"],
      ["Course Name", registration.courseName || "N/A"],
      ["Address", registration.address || "N/A"],
      ["State", registration.state || "N/A"],
      ["Orphan", registration.orphan ? "Yes" : "No"],
      ["Disabled", registration.disabled ? "Yes" : "No"],
    ];

    // Draw table headers and background
    doc
      .rect(35, tableTop - 5, 520, 20)
      .fillOpacity(0.1)
      .fill("#E0E0E0")
      .fillOpacity(1);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#333333")
      .text("Field", col1X, tableTop, { width: labelWidth })
      .text("Details", col2X, tableTop, { width: valueWidth });

    // Draw student details in a table-like format
    let currentY = tableTop + rowHeight;
    studentFields.forEach(([label, value], index) => {
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333333")
        .text(label, col1X, currentY, { width: labelWidth, align: "left" });
      doc
        .font("Helvetica")
        .text(value, col2X, currentY, { width: valueWidth * 2, align: "left" });
      currentY += rowHeight;
    });

    // Draw table border
    doc
      .rect(35, tableTop - 5, 520, currentY - tableTop)
      .lineWidth(0.5)
      .strokeColor("#CCCCCC")
      .stroke();
    doc.moveDown(2);

    // Book Request Details Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Book Request Details", 40, doc.y, { underline: true })
      .moveDown(0.5);

    // Book details in a table-like format
    const bookTableTop = doc.y;
    const bookFields = [
      ["Year of Study", app.yearOfStudy || "N/A"],
      ["Field", app.field || "N/A"],
      ["Books Required", ""], // Books will be listed separately
    ];

    // Draw book details table
    doc
      .rect(35, bookTableTop - 5, 520, 20)
      .fillOpacity(0.1)
      .fill("#E0E0E0")
      .fillOpacity(1);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#333333")
      .text("Field", col1X, bookTableTop, { width: labelWidth })
      .text("Details", col2X, bookTableTop, { width: valueWidth });

    currentY = bookTableTop + rowHeight;
    bookFields.forEach(([label, value], index) => {
      if (label === "Books Required") return; // Handle books separately
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333333")
        .text(label, col1X, currentY, { width: labelWidth, align: "left" });
      doc
        .font("Helvetica")
        .text(value, col2X, currentY, { width: valueWidth * 2, align: "left" });
      currentY += rowHeight;
    });

    // Parse and list books required
    const booksRequiredClean = app.booksRequired.split(",").map((b) => {
      let match = b.match(/(.+?)\s*\((Textbook|Guide)\)/i);
      if (match) {
        let name = match[1].trim();
        let type = match[2];
        return `${name} - ${type}`;
      }
      return b.trim();
    });

    // Draw books required as a numbered list with visible font color
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor("#333333") // Ensure label is visible
      .text("Books Required", col1X, currentY, { width: labelWidth });
    booksRequiredClean.forEach((book, index) => {
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#333333") // Ensure book items are visible
        .text(`${index + 1}. ${book}`, col2X, currentY, {
          width: valueWidth * 2,
          align: "left",
        });
      currentY += rowHeight;
    });

    // Draw book table border
    doc
      .rect(35, bookTableTop - 5, 520, currentY - bookTableTop)
      .lineWidth(0.5)
      .strokeColor("#CCCCCC")
      .stroke();
    doc.moveDown(2);

    // Footer
    const pageHeight = doc.page.height;
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#666666")
      .text(
        "Vivekanand Seva Mandal | Contact: info@vsm.org | Page 1 of 1",
        40,
        pageHeight - 50,
        { align: "center" }
      );

    // Finalize PDF
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message || "Server error" });
  }
});

// Download School Fees Application as PDF
router.get("/download/school-fees/:id", [auth, adminAuth], async (req, res) => {
  try {
    // Fetch application and registration data
    const app = await SchoolFeesApplication.findById(req.params.id).populate(
      "user"
    );
    if (!app) return res.status(404).json({ msg: "Application not found" });
    const registration = await StudentRegistration.findOne({
      user: app.user._id,
    });
    if (!registration)
      return res.status(404).json({ msg: "Student registration not found" });

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      info: {
        Title: `School Fees Application - ${app._id}`,
        Author: "Vivekanand Seva Mandal",
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=school-fees-application-${app._id}.pdf`
    );
    doc.pipe(res);

    // Helper function to draw a horizontal line
    const drawLine = (y, xStart = 40, xEnd = 555) => {
      doc.moveTo(xStart, y).lineTo(xEnd, y).lineWidth(1).stroke();
    };

    // Header Section
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#003087")
      .text("Vivekanand Seva Mandal", { align: "center" })
      .moveDown(0.3);
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("School Fees Scholarship Application", { align: "center" })
      .moveDown(0.5);
    drawLine(doc.y + 10);
    doc.moveDown(1);

    // Student Details Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Student Details", 40, doc.y, { underline: true })
      .moveDown(0.5);

    // Table-like layout for student details
    const tableTop = doc.y;
    const col1X = 40;
    const col2X = 200;
    const rowHeight = 20;
    const labelWidth = 150;
    const valueWidth = 150;

    // Define student details fields
    const studentFields = [
      ["Academic Year", registration.academicYear || "N/A"],
      ["Date", registration.date ? registration.date.toDateString() : "N/A"],
      ["Applicant Name", registration.applicantName || "N/A"],
      ["Mother's Name", registration.motherName || "N/A"],
      ["DOB", registration.dob ? registration.dob.toDateString() : "N/A"],
      ["Gender", registration.gender || "N/A"],
      ["Caste", registration.caste || "N/A"],
      ["College Name", registration.collegeName || "N/A"],
      ["Course Name", registration.courseName || "N/A"],
      ["Address", registration.address || "N/A"],
      ["State", registration.state || "N/A"],
      ["Orphan", registration.orphan ? "Yes" : "No"],
      ["Disabled", registration.disabled ? "Yes" : "No"],
    ];

    // Draw table headers and background
    doc
      .rect(35, tableTop - 5, 520, 20)
      .fillOpacity(0.1)
      .fill("#E0E0E0")
      .fillOpacity(1);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#333333")
      .text("Field", col1X, tableTop, { width: labelWidth })
      .text("Details", col2X, tableTop, { width: valueWidth });

    // Draw student details in a table-like format
    let currentY = tableTop + rowHeight;
    studentFields.forEach(([label, value], index) => {
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333333")
        .text(label, col1X, currentY, { width: labelWidth, align: "left" });
      doc
        .font("Helvetica")
        .text(value, col2X, currentY, { width: valueWidth * 2, align: "left" });
      currentY += rowHeight;
    });

    // Draw table border
    doc
      .rect(35, tableTop - 5, 520, currentY - tableTop)
      .lineWidth(0.5)
      .strokeColor("#CCCCCC")
      .stroke();
    doc.moveDown(2);

    // Uploaded Documents Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Uploaded Documents", 40, doc.y, { underline: true })
      .moveDown(0.5);

    const docFields = [
      ["Birth Certificate", "birthCertificate"],
      ["Leaving Certificate", "leavingCertificate"],
      ["Marksheet", "marksheet"],
      ["Admission Proof", "admissionProof"],
      ["Income Proof", "incomeProof"],
      ["Bank Account Details", "bankAccount"],
      ["Ration Card", "rationCard"],
    ];
    doc.font("Helvetica").fontSize(11).fillColor("#222");
    doc.moveDown(0.2);
    const baseUrl = req.protocol + "://" + req.get("host");
    docFields.forEach(([label, field]) => {
      if (app[field] && app[field].data) {
        const fullUrl = `${baseUrl}/api/admin/school-fees/${app._id}/file/${field}`;
        doc.text(`${label}: `, {
          continued: true,
          underline: false,
          link: undefined,
        });
        doc.fillColor("blue").text("Link", { link: fullUrl, underline: true });
        doc.fillColor("#222");
      }
    });
    doc.moveDown(2);

    // Footer
    doc
      .font("Helvetica-Oblique")
      .fontSize(10)
      .fillColor("#888888")
      .text(
        "This is a system-generated document. All uploaded documents are available at the above links.",
        40,
        doc.y,
        { align: "left" }
      );

    doc.end();
  } catch (err) {
    console.error(err);
    if (doc && !doc.ended)
      try {
        doc.end();
      } catch (e) {}
    res.status(500).json({ msg: err.message || "Server error" });
  }
});

// GET /api/admin/school-fees/:appId/file/:fieldName
router.get(
  "/school-fees/:appId/file/:fieldName",
  [auth, adminAuth],
  async (req, res) => {
    try {
      const { appId, fieldName } = req.params;
      const app = await SchoolFeesApplication.findById(appId);
      if (!app || !app[fieldName] || !app[fieldName].data) {
        return res.status(404).json({ msg: "File not found" });
      }
      const fileBuffer = Buffer.isBuffer(app[fieldName].data)
        ? app[fieldName].data
        : Buffer.from(app[fieldName].data);

      res.setHeader("Content-Type", app[fieldName].contentType);
      res.setHeader("Content-Length", fileBuffer.length);
      const dispositionType =
        app[fieldName].contentType.startsWith("image/") ||
        app[fieldName].contentType === "application/pdf"
          ? "inline"
          : "attachment";
      res.setHeader(
        "Content-Disposition",
        `${dispositionType}; filename=\"${app[fieldName].fileName}\"`
      );
      res.send(fileBuffer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
