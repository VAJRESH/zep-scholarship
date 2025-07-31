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

// GET /api/admin/search-by-book-number/:number
router.get(
  "/search-by-book-number/:number",
  [auth, adminAuth],
  async (req, res) => {
    try {
      // Get all study book applications that have the given book number
      const bookNumber = parseInt(req.params.number);
      if (isNaN(bookNumber)) {
        return res.status(400).json({ msg: "Invalid book number" });
      }

      // Find all applications where bookNumbers field exists and is not empty
      const applications = await StudyBooksApplication.find({
        bookNumbers: { $exists: true },
      }).populate("user");

      // Filter applications that have the specified book number
      const matchingApplications = applications.filter((app) => {
        return Array.from(app.bookNumbers.values()).includes(bookNumber);
      });

      if (matchingApplications.length === 0) {
        return res
          .status(404)
          .json({ msg: "No applications found with this book number" });
      }

      // Get student registrations for all matching users
      const userIds = matchingApplications.map((app) => app.user._id);
      const registrations = await StudentRegistration.find({
        user: { $in: userIds },
      });

      // Create a map of user IDs to their registration details
      const registrationMap = new Map(
        registrations.map((reg) => [reg.user.toString(), reg])
      );

      // Combine the data
      const results = matchingApplications.map((app) => {
        const registration = registrationMap.get(app.user._id.toString());
        const matchingBooks = Array.from(app.bookNumbers.entries())
          .filter(([_, num]) => num === bookNumber)
          .map(([book]) => book);

        return {
          applicationId: app._id,
          generatedId: app.generatedId,
          status: app.status,
          studentDetails: registration
            ? {
                name: registration.applicantName,
                collegeName: registration.collegeName,
                courseName: registration.courseName,
                address: registration.address,
                contact: registration.contact,
              }
            : null,
          matchingBooks,
          bookSet: {
            standard: app.standard,
            stream: app.stream,
            medium: app.medium,
          },
        };
      });

      res.json({
        success: true,
        results,
      });
    } catch (err) {
      console.error("Error searching by book number:", err);
      res
        .status(500)
        .json({ msg: "Server error while searching by book number" });
    }
  }
);
