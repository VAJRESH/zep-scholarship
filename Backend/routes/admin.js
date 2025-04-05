const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const User = require("../models/User");
const StudentRegistration = require("../models/StudentRegistration");
const SchoolFeesApplication = require("../models/SchoolFeesApplication");
const TravelExpensesApplication = require("../models/TravelExpensesApplication");
const StudyBooksApplication = require("../models/StudyBooksApplication");

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

module.exports = router;

module.exports = router;
