const mongoose = require("mongoose");

const StudyBooksApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicationType: {
    type: String,
    default: "studyBooks",
  },
  yearOfStudy: {
    type: String,
    required: false,
  },
  field: {
    type: String,
    required: false,
  },
  booksRequired: {
    type: String,
    required: true,
  },
  // New fields for admin dropdowns
  standard: {
    type: String,
    required: false,
  },
  stream: {
    type: String,
    required: false,
  },
  medium: {
    type: String,
    required: false,
  },
  generatedId: {
    type: String,
    required: false,
  },
  setNumber: {
    type: Number,
    required: false,
  },
  // New field to store book numbers
  bookNumbers: {
    type: Map,
    of: Number,
    default: new Map(),
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  rejectionReason: {
    type: String,
  },
  rejectionDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "StudyBooksApplication",
  StudyBooksApplicationSchema
);
